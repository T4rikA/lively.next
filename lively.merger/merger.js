import { mergeObjects } from './3-way-merger.js';
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
        const morph = world.submorphs.filter(submorph => submorph.derivationIds[submorph.derivationIds.length - 2] === currentId)[0];
        return morph;
      }
    }
  }
    
  return new Morph();    
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
    // TODO conflict resolve
  return onMergeResult(result.properties, result.mergeConflicts);
}

export async function mergeMorphsWithIds (
  morphAid, 
  morphBid, 
  onMergeResult = (properties, mergeConficts) => new Morph(properties)
) {
  const morphA = $world.submorphs.filter(morph => morph.id === morphAid)[0];
  if (!morphA) {
    throw new Error(`Cannot merge morphs, morphA with id ${morphAid} not found`);
  }
  const morphB = $world.submorphs.filter(morph => morph.id === morphBid)[0];
  if (!morphB) {
    throw new Error(`Cannot merge morphs, morphB with id ${morphBid} not found`);
  }
  return mergeMorphs(
    morphA, 
    morphB, 
    (properties, mergeConflicts) => onMergeResult(properties, mergeConflicts)).catch(error => { throw error; });
}

export async function mergeMorphsIntoA (morphA, morphB) {
  return mergeMorphs(morphA, morphB, (properties, mergeConflicts) => {
    Object.keys(properties).forEach(key => {
      morphA[key] = properties[key];
    });
    return morphA;
  }).catch(error => console.log(error));
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
