import { mergeObjects } from './3-way-merger.js';
import { Morph } from 'lively.morphic';

export class Merger {
  static propertiesFromMorph (morph) {    
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

  static mergeMorphsWithIdsIntoA (morphAid, morphBid) {
    return this.mergeMorphsWithIds(morphAid, morphBid, (properties, mergeConflicts) => {
      const morphA = $world.submorphs.filter(morph => morph.id === morphAid)[0];
      Object.keys(properties).forEach(key => {
        morphA[key] = properties[key];
      });
      return morphA;
    });
  }

  static mergeMorphsWithIdsIntoB (morphAid, morphBid) {
    return this.mergeMorphsWithIdsIntoA(morphBid, morphAid);
  }

  static mergeMorphsWithIds (
    morphAid, 
    morphBid, 
    onMergeResult = (properties, mergeConficts) => new Morph(properties)
  ) {
    const morphA = $world.submorphs.filter(morph => morph.id === morphAid)[0];
    if (!morphA) {
      throw new Error(`Cannot merge morphs, morph1 with id ${morphAid} not found`);
    }
    const morphB = $world.submorphs.filter(morph => morph.id === morphBid)[0];
    if (!morphB) {
      throw new Error(`Cannot merge morphs, morphB with id ${morphBid} not found`);
    }
    return this.mergeMorphs(
      morphA, 
      morphB, 
      (properties, mergeConflicts) => onMergeResult(properties, mergeConflicts));
  }

  static mergeMorphsIntoA (morphA, morphB) {
    return this.mergeMorphs(morphA, morphB, (properties, mergeConflicts) => {
      Object.keys(properties).forEach(key => {
        morphA[key] = properties[key];
      });
      return morphA;
    });
  }

  static mergeMorphsIntoB (morphA, morphB) {
    return this.mergeMorphsIntoA(morphB, morphA);
  }

  static mergeMorphs (
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

    let parentMorph = this.getLowestCommonAncestor(morphA, morphB);

    let propertiesmorphA = this.propertiesFromMorph(morphA);
    let propertiesmorphB = this.propertiesFromMorph(morphB);
    let propertiesParentMorph = this.propertiesFromMorph(parentMorph);

    let result = mergeObjects(
      propertiesParentMorph,
      propertiesmorphA,
      propertiesmorphB);
    // TODO conflict resolve
    return onMergeResult(result.properties, result.mergeConflicts);
  }

  static getLowestCommonAncestor (morphA, morphB) {
    for (let index = morphA.derivationIds.length - 1; index >= 0; index--) {
      const currentId = morphA.derivationIds[index];

      if (morphB.derivationIds.includes(currentId)) {
        const parentMorph = $world.submorphs.filter(morph => morph.id === currentId)[0];
        if (parentMorph) {
          return parentMorph;
        } else {
          // TODO: go to morphicDB to get the last saved snapshot
        }
      }
    }
    
    return new Morph();    
  }
}
