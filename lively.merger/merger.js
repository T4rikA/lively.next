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

  static mergeMorphsWithIds (morph1id, morph2id) {
    const morph1 = $world.submorphs.filter(morph => morph.id === morph1id)[0];
    if (!morph1) {
      throw new Error(`Cannot merge morphs, morph1 with id ${morph1id} not found`);
    }
    const morph2 = $world.submorphs.filter(morph => morph.id === morph2id)[0];
    if (!morph2) {
      throw new Error(`Cannot merge morphs, morph2 with id ${morph2id} not found`);
    }
    return this.mergeMorphs(morph1, morph2);
  }

  static mergeMorphs (morph1, morph2) {
    if (!morph1.isMorph || !morph2.isMorph) {
      throw new Error('Cannot merge objects that are not morphs');
    }
    if (JSON.stringify(morph1.styleClasses) !== JSON.stringify(morph2.styleClasses)) {
      throw new Error('Cannot merge morphs, styleclasses differ');
    }

    let parentMorph = this.getLowestCommonAncestor(morph1, morph2);

    let propertiesMorph1 = this.propertiesFromMorph(morph1);
    let propertiesMorph2 = this.propertiesFromMorph(morph2);
    let propertiesParentMorph = this.propertiesFromMorph(parentMorph);

    let result = mergeObjects(
      propertiesParentMorph,
      propertiesMorph1,
      propertiesMorph2);
    // TODO conflict resolve
    return new Morph(result.properties);
  }

  static getLowestCommonAncestor (morph1, morph2) {
    for (let index = morph1.derivationIds.length - 1; index >= 0; index--) {
      const currentId = morph1.derivationIds[index];

      if (morph2.derivationIds.includes(currentId)) {
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
