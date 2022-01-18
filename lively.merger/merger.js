import { Differ } from './differ.js';
import { merge } from './3-way-merger.js';
import { Morph } from 'lively.morphic';

export class Merger {
  static propertiesFromMorph (morph) {
    const properties = {};
    Object.keys(morph.propertiesAndPropertySettings().properties).forEach(key => {
      if (key !== 'styleProperties') { properties[key] = morph[key]; }
    });
    return properties;
  }

  static mergeMorphsWithIds (morph1id, morph2id) {
    const morph1 = $world.submorphs.filter(morph => morph.id === morph1id)[0];
    if (!morph1) {
      throw new Error(`Cannot merge morphs, morph1 with id ${morph1id} not found`);
      return;
    }

    const morph2 = $world.submorphs.filter(morph => morph.id === morph2id)[0];
    if (!morph2) {
      throw new Error(`Cannot merge morphs, morph2 with id ${morph2id} not found`);
      return;
    }

    return this.mergeMorphs(morph1, morph2);
  }

  static mergeMorphs (morph1, morph2) {
    if (!this.isMorph(morph1) || !this.isMorph(morph2)) {
      throw new Error('Cannot merge objects that are not morphs');
    }

    if (JSON.stringify(morph1.styleClasses) != JSON.stringify(morph2.styleClasses)) {
      throw new Error('Cannot merge morphs, styleclasses differ');
    }

    let parentMorph = this.getLowestCommonAncestor(morph1, morph2);

    let propertiesParentMorph = this.propertiesFromMorph(parentMorph);
    let propertiesMorph1 = this.propertiesFromMorph(morph1);
    let propertiesMorph2 = this.propertiesFromMorph(morph2);

    let properties = merge(
      propertiesBaseMorph,
      propertiesMorph1,
      propertiesMorph2);
    return new Morph(properties);
  }

  static getLowestCommonAncestor (morph1, morph2) {
    for (let index = morph1.derivationIDs.length - 1; index > 0; index--) {
      const currentId = morph1.derivationIDs[index];

      if (morph2.derivationIDs.includes(currentId)) {
        const parentMorph = $world.submorphs.filter(morph => morph.id === currentId)[0]
        if (parentMorph) {
          return parentMorph
        } else {
          // TODO: go to morphicDB to get the last saved snapshot
        }
      }
    }
    
    return new Morph();    
  }
}
