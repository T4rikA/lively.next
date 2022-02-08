import { merge } from './3-way-merger.js';
import { Morph, loadMorphFromSnapshot } from 'lively.morphic';
import MorphicDB from 'lively.morphic/morphicdb/db.js';

export function propertiesFromMorph (morph) {    
  const properties = {};

  Object.filter = (obj, predicate) => 
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => (res[key] = obj[key], res), {});
  Object.keys(Object.filter(morph.propertiesAndPropertySettings().properties, property => !property.derived)).forEach(key => {
    if (key !== ('styleProperties' || 'style')) { properties[key] = morph[key]; }
  });
  return properties;
}

export async function getLowestCommonAncestor (morphA, morphB) {
  for (let index = morphA.derivationIds.length - 1; index >= 0; index--) {
    const currentId = morphA.derivationIds[index];
    if (morphB.derivationIds.includes(currentId)) {
      const parentMorph = $world.submorphs.filter(morph => morph.id === currentId)[0];
      if (parentMorph) {
        return parentMorph;
      } else {
        const latestCommit = await MorphicDB.default.fetchCommit('world', $world.name);
        const chronologicalHistory = await MorphicDB.default.log(latestCommit._id, undefined, true);
        let lowestCommit;
        for (const commit of chronologicalHistory) {
          const worldStateForCommit = await MorphicDB.default.fetchCommit('world', $world.name, commit._id);
          const snapshot = await MorphicDB.default.fetchSnapshot(undefined, undefined, worldStateForCommit._id);
          const submorphs = snapshot.snapshot[Object.keys(snapshot.snapshot).filter(name => name.startsWith('livelyworld_'))].props.submorphs.value;
          if (submorphs.filter(submorph => submorph.id === currentId).length > 0) {
            lowestCommit = commit;
            break;
          }
        }
        const snapshot = await MorphicDB.default.fetchSnapshot(undefined, undefined, lowestCommit._id);
        const world = await loadMorphFromSnapshot(snapshot);
        return world.submorphs.filter(submorph => submorph.derivationIds[submorph.derivationIds.length - 2] === currentId)[0];
      }
    }
  }
    
  return new Morph();    
}

export async function mergeSubmorphs (morphA, morphB, parentMorph) {
  const submorphParentIds = parentMorph.submorphs.map(submorph => submorph.derivationIds);
  const submorphAIds = morphA.submorphs.map(submorph => submorph.derivationIds);
  const submorphBIds = morphB.submorphs.map(submorph => submorph.derivationIds);

  let matching = [];
  
  submorphAIds.forEach(submorphADerivationIds => {
    submorphBIds.forEach(submorphBDerivationIds => {
      if (submorphADerivationIds[0] === submorphBDerivationIds[0]) {
        matching.push({ 
          a: submorphADerivationIds[submorphADerivationIds.length - 1], 
          b: submorphBDerivationIds[submorphBDerivationIds.length - 1], 
          parent: submorphADerivationIds[0] 
        });
      }
    });
  });

  let resultPromises = [];

  matching.forEach(pair => {
    const submorphA = morphA.submorphs.filter(submorph => submorph.id === pair.a)[0];
    const submorphB = morphB.submorphs.filter(submorph => submorph.id === pair.b)[0];
    const submorphParent = parentMorph.submorphs.filter(submorph => submorph.id === pair.parent)[0];
    console.log(submorphA, submorphB, submorphParent);
    resultPromises.push(merge(propertiesFromMorph(submorphParent), propertiesFromMorph(submorphA), propertiesFromMorph(submorphB)));
  });

  let result = await Promise.all(resultPromises);

  console.log(result);
  
  // console.log({
  //   parent: submorphParentIds,
  //   morphA: submorphAIds,
  //   morphB: submorphBIds
  // });

  // console.log('matching', matching);
  return [];
}

export async function mergeMorphs (
  morphA, 
  morphB, 
  onMergeResult = (properties, mergeConficts) => new Morph(properties)
) {
  if (!morphA.isMorph || !morphB.isMorph) {
    throw new Error('Cannot merge objects that are not morphs');
  }
  if (JSON.stringify(morphA.styleClasses) !== JSON.stringify(morphB.styleClasses)) {
    throw new Error('Cannot merge morphs, styleclasses differ');
  }

  let parentMorph = await getLowestCommonAncestor(morphA, morphB);

  let propertiesmorphA = propertiesFromMorph(morphA);
  let propertiesmorphB = propertiesFromMorph(morphB);
  let propertiesParentMorph = propertiesFromMorph(parentMorph);

  let result = merge(
    propertiesParentMorph,
    propertiesmorphA,
    propertiesmorphB);
  const submorphs = mergeSubmorphs(morphA, morphB, parentMorph);
  // TODO conflict resolve
  return onMergeResult(result.properties, result.mergeConflicts);
}

function findMorph (id, startMorph = $world) {
  let result = startMorph.submorphs.filter(morph => morph.id === id);
  
  if (result.length > 0) {
    return result[0];
  } else {
    for (let submorph in startMorph.submorphs) {
      let submorphResult = findMorph(id, submorph);
      if (submorphResult) {
        return submorphResult;
      }
    }
  }

  return new Morph();
}

export async function mergeMorphsWithIds (
  morphAid, 
  morphBid, 
  onMergeResult = (properties, mergeConficts) => new Morph(properties)
) {
  const morphA = findMorph(morphAid);
  if (!morphA) {
    throw new Error(`Cannot merge morphs, morphA with id ${morphAid} not found`);
  }
  const morphB = findMorph(morphBid);
  if (!morphB) {
    throw new Error(`Cannot merge morphs, morphB with id ${morphBid} not found`);
  }
  return mergeMorphs(
    morphA, 
    morphB, 
    (properties, mergeConflicts) => onMergeResult(properties, mergeConflicts));
}

export async function mergeMorphsIntoA (morphA, morphB) {
  return mergeMorphs(morphA, morphB, (properties, mergeConflicts) => {
    Object.keys(properties).forEach(key => {
      morphA[key] = properties[key];
    });
    return morphA;
  });
}

export async function mergeMorphsIntoB (morphA, morphB) {
  return mergeMorphsIntoA(morphB, morphA);
}

export async function mergeMorphsWithIdsIntoA (morphAid, morphBid) {
  const morphA = $world.submorphs.filter(morph => morph.id === morphAid)[0];
  if (!morphA) {
    throw new Error(`Cannot merge morphs, morphA with id ${morphAid} not found`);
  }
  const morphB = $world.submorphs.filter(morph => morph.id === morphBid)[0];
  if (!morphB) {
    throw new Error(`Cannot merge morphs, morphB with id ${morphBid} not found`);
  }
  return mergeMorphsIntoA(morphA, morphB);
}

export async function mergeMorphsWithIdsIntoB (morphAid, morphBid) {
  return mergeMorphsWithIdsIntoA(morphBid, morphAid);
}

export async function mergeWorlds (expectedVersion, actualVersion, strategy) {
  const expectedCommit = await MorphicDB.default.fetchCommit('world', $world.name, expectedVersion);
  const expectedSnapshot = await MorphicDB.default.fetchSnapshot(undefined, undefined, expectedCommit._id);
  const expectedWorld = await loadMorphFromSnapshot(expectedSnapshot);
    
  const actualCommit = await MorphicDB.default.fetchCommit('world', $world.name, actualVersion);
  const actualSnapshot = await MorphicDB.default.fetchSnapshot(undefined, undefined, actualCommit._id);
  const actualWorld = await loadMorphFromSnapshot(actualSnapshot);
  
  console.log(strategy);
  switch (strategy) {
    case 'Merge mine':
      // todo load the new version, merge their changes if merge conflict take mine
      break;
    case 'Manual merge':
      // todo
      break;
    case 'Merge theirs':
      // todo load the actual version, merge my changes if merge conflict take theirs
      break;
  }
    
  return expectedWorld;
}
