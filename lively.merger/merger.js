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
    if (key !== 'submorphs' && key !== 'styleProperties' && key !== 'style') { properties[key] = morph[key]; }
  });
  return properties;
}

export async function getLowestCommonAncestor (morphA, morphB) {
  let result = { parentMorph: undefined, foundInWorld: true };
  for (let index = morphA.derivationIds.length - 1; index >= 0; index--) {
    const currentId = morphA.derivationIds[index];
    if (morphB.derivationIds.includes(currentId)) {
      const parentMorph = $world.submorphs.filter(morph => morph.id === currentId)[0];
      if (parentMorph) {
        result.parentMorph = parentMorph;
        return result;
      } else {
        result.foundInWorld = false;
        const latestCommit = await MorphicDB.default.fetchCommit('world', $world.name);
        if (!latestCommit) break;
        const chronologicalHistory = await MorphicDB.default.log(latestCommit._id, undefined, true);
        for (const commit of chronologicalHistory) {
          const worldStateForCommit = await MorphicDB.default.fetchCommit('world', $world.name, commit._id);
          const snapshot = await MorphicDB.default.fetchSnapshot(undefined, undefined, worldStateForCommit._id);
          const worldSnapshot = Object.values(snapshot.snapshot).find(snapshot => {
            if (snapshot.props.name) {
              if (snapshot.props.name.value === $world.name) return snapshot;
            }
          });

          const worldIncludesId = worldSnapshot.props.derivationIds.value[worldSnapshot.props.derivationIds.value.length - 1] === currentId;
          const submorphsIncludeId = worldSnapshot.props.submorphs.value.includes(submorph => submorph.id === currentId);
          if (worldIncludesId) {
            result.parentMorph = await loadMorphFromSnapshot(snapshot);
            return result;
          }
          if (submorphsIncludeId) {
            result.parentMorph = await loadMorphFromSnapshot(snapshot).submorphs.filter(submorph => submorph.derivationIds[submorph.derivationIds.length - 2] === currentId)[0];
            return result;
          }
        }
      }
    }
  }
  return result;
}

function isSpecialMorph (morph) {
  if (morph.isHand || morph.isWindow || morph.isEpiMorph) return true;
  return false;
}

function lastMatchingDerivationId (array1, array2) {
  let lastIndex = 0;
  while (lastIndex <= array1.length) {
    lastIndex += 1;
    if (array1[lastIndex] !== array2[lastIndex]) {
      return array1[lastIndex - 1];
    }
  }
  return array1[lastIndex];
}

export async function mergeSubmorphs (morphA, morphB, parentMorphResult, onMergeResult, strategy) {
  const parentMorph = parentMorphResult.parentMorph;
  const submorphAIds = morphA.submorphs.filter(submorph => !isSpecialMorph(submorph)).map(submorph => submorph.derivationIds);
  const submorphBIds = morphB.submorphs.filter(submorph => !isSpecialMorph(submorph)).map(submorph => submorph.derivationIds);
  const submorphParentIds = parentMorph.submorphs.filter(submorph => !isSpecialMorph(submorph)).map(submorph => submorph.derivationIds);
  let matching = [];
  submorphAIds.forEach(submorphADerivationIds => {
    let foundInB = false;
    // submorph in both morphs
    submorphBIds.forEach(submorphBDerivationIds => {
      if (submorphADerivationIds[0] === submorphBDerivationIds[0]) {
        matching.push({
          a: submorphADerivationIds[submorphADerivationIds.length - 1],
          b: submorphBDerivationIds[submorphBDerivationIds.length - 1],
          parent: parentMorph.submorphs.filter(submorph => submorph.derivationIds.includes(lastMatchingDerivationId(submorphADerivationIds, submorphBDerivationIds)))[0].id
        });
        foundInB = true;
      }
    });
    // submorph just in morph a
    if (!foundInB) {
      const parentId = submorphParentIds.filter(derivationIds => derivationIds.includes(submorphADerivationIds[0]))[0];
      matching.push({
        a: submorphADerivationIds[submorphADerivationIds.length - 1],
        b: undefined,
        parent: parentId || submorphADerivationIds[submorphADerivationIds.length - 1]
      });
    }
  });
  // submorph just in morph b
  submorphBIds.forEach(submorphBDerivationIds => {
    if (!submorphAIds.map(ids => ids[0]).includes(submorphBDerivationIds[0])) {
      const parentId = submorphParentIds.filter(derivationIds => derivationIds.includes(submorphBDerivationIds[0]))[0];
      matching.push({
        a: undefined,
        b: submorphBDerivationIds[submorphBDerivationIds.length - 1],
        parent: parentId || submorphBDerivationIds[submorphBDerivationIds.length - 1]
      });
    }
  });

  let result = {
    submorphs: []
  };
  for (let pair of matching) {
    const submorphA = morphA.submorphs.filter(submorph => submorph.id === pair.a)[0];
    const submorphB = morphB.submorphs.filter(submorph => submorph.id === pair.b)[0];
    let submorphParent;
    if (parentMorphResult.foundInWorld) {
      submorphParent = parentMorph.submorphs.filter(submorph => submorph.id === pair.parent)[0];
    } else {
      // TODO: check if includes is needed here or if there are special cases where this might be wrong TA 18.03.2022
      submorphParent = parentMorph.submorphs.filter(submorph => submorph.derivationIds.includes(pair.parent))[0];
    }

    let submorphMergeResult = {};
    let onMergeResultForPair = onMergeResult;

    if (!submorphA && submorphB) {
      // submorph added to b or removed from a
      if (pair.b === pair.parent || strategy !== 'Merge mine') {
        submorphMergeResult.properties = propertiesFromMorph(submorphB);
        submorphMergeResult.mergeConflicts = [];
        if (!onMergeResultForPair) { onMergeResultForPair = (properties, mergeConflicts, morphA, morphB) => { return new submorphB.constructor(properties); }; }
      }
    } else
    if (submorphA && !submorphB) {
      // submorph added to a or removed from b
      if (pair.a === pair.parent || strategy !== 'Merge theirs') {
        submorphMergeResult.properties = propertiesFromMorph(submorphA);
        submorphMergeResult.mergeConflicts = [];
        if (!onMergeResultForPair) { onMergeResultForPair = (properties, mergeConflicts, morphA, morphB) => { return new submorphA.constructor(properties); }; }
      }
    } else
    if (!submorphA && !submorphB) {
      continue;
    } else
    if (submorphA && submorphB) {
      submorphMergeResult = await merge(propertiesFromMorph(submorphParent), propertiesFromMorph(submorphA), propertiesFromMorph(submorphB));
      const subMorphParentResult = { parentMorph: submorphParent, foundInWorld: parentMorphResult.foundInWorld };
      const subSubmorphResult = await mergeSubmorphs(submorphA, submorphB, subMorphParentResult, onMergeResult, strategy);
      submorphMergeResult.properties.submorphs = subSubmorphResult.submorphs;
      if (!onMergeResultForPair) onMergeResultForPair = (properties, mergeConflicts, morphA, morphB) => { return new submorphParent.constructor(properties); };
    }
    if (submorphMergeResult.properties && submorphMergeResult.mergeConflicts) {
      result.submorphs.push(await onMergeResultForPair(submorphMergeResult.properties, submorphMergeResult.mergeConflicts, submorphA, submorphB));
    }
  }
  return result;
}

export async function mergeMorphs (
  morphA,
  morphB,
  onMergeResult,
  strategy
) {
  if (!morphA.isMorph || !morphB.isMorph) {
    throw new Error('Cannot merge objects that are not morphs');
  }
  if (JSON.stringify(morphA.styleClasses) !== JSON.stringify(morphB.styleClasses)) {
    throw new Error('Cannot merge morphs, styleclasses differ');
  }

  const parentMorphResult = await getLowestCommonAncestor(morphA, morphB);
  const parentMorph = parentMorphResult.parentMorph;

  if (typeof parentMorph.__provideMergeStrategy__ === 'function') {
    return parentMorph.__provideMergeStrategy__(morphA, morphB, onMergeResult);
  }
  let propertiesmorphA = propertiesFromMorph(morphA);
  let propertiesmorphB = propertiesFromMorph(morphB);
  let propertiesParentMorph = propertiesFromMorph(parentMorph);
  const submorphResult = await mergeSubmorphs(morphA, morphB, parentMorphResult, onMergeResult, strategy);

  if (!onMergeResult) {
    onMergeResult = (properties, mergeConflicts, morphA, morphB) => { return new parentMorph.constructor(properties); };
  }

  let mergeResult = merge(
    propertiesParentMorph,
    propertiesmorphA,
    propertiesmorphB);
  mergeResult.properties.submorphs = submorphResult.submorphs;
  mergeResult.mergeConflicts.push(...submorphResult.mergeConflicts);
  // TODO conflict resolve
  const result = onMergeResult(mergeResult.properties, mergeResult.mergeConflicts, morphA, morphB);
  result.makeDirty();
  return result;
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
  onMergeResult,
  strategy
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
    onMergeResult, strategy);
}

export async function mergeMorphsIntoA (morphA, morphB, strategy) {
  return mergeMorphs(morphA, morphB, (properties, mergeConflicts, morphA, morphB) => {
    Object.keys(properties).forEach(key => {
      morphA[key] = properties[key];
    });
    return morphA;
  }, strategy);
}

export async function mergeMorphsIntoB (morphA, morphB, strategy) {
  return mergeMorphsIntoA(morphB, morphA, strategy);
}

export async function mergeMorphsWithIdsIntoA (morphAid, morphBid, strategy) {
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

export async function manualMergeDialog (morphA, morphB, parentMorphResult, strategy) {
  const conflictResolutionModule = await System.import('lively.merger/conflictResolutionTool.js');
  const conflictResolutionPrompt = conflictResolutionModule.conflictResolutionPrompt;

  const callback = async (properties, conflicts, a, b) => {
    if (conflicts) {
      conflicts = conflicts.filter(conflict => conflict.property !== 'valueOf');
      if (conflicts.length > 0) {
        const resolvedConflicts = await conflictResolutionPrompt(conflicts);
        Object.keys(resolvedConflicts).forEach(property => properties[property] = resolvedConflicts[property]);
      }
    }
    if (a) return new a.constructor(properties);
    else return new b.constructor(properties);
  };

  return mergeSubmorphs(morphA, morphB, parentMorphResult, callback, strategy);
}

export async function mergeWorlds (newerWorld, olderWorld, strategy) {
  let result;
  const parentWorldResult = await getLowestCommonAncestor(newerWorld, olderWorld);

  switch (strategy) {
    case 'Merge mine':
      result = await mergeSubmorphs(newerWorld, olderWorld, parentWorldResult, undefined, strategy);
      olderWorld.submorphs = olderWorld.submorphs.filter(submorph => isSpecialMorph(submorph)).concat(result.submorphs);
      return olderWorld;
    case 'Manual merge':
      result = await manualMergeDialog(newerWorld, olderWorld, parentWorldResult, strategy);
      newerWorld.submorphs = newerWorld.submorphs.filter(submorph => isSpecialMorph(submorph)).concat(result.submorphs);
      return newerWorld;
    case 'Merge theirs':
      result = await mergeSubmorphs(newerWorld, olderWorld, parentWorldResult, undefined, strategy);
      newerWorld.submorphs = newerWorld.submorphs.filter(submorph => isSpecialMorph(submorph)).concat(result.submorphs);
      return newerWorld;
  }

  return result;
}
