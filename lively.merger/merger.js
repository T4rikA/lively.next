import { mergeObjects } from './3-way-merger.js';
import { Morph } from 'lively.morphic';

export class Merger {
  static propertiesFromMorph (morph) {
    const properties = {};
    Object.keys(morph.propertiesAndPropertySettings().properties).forEach(key => {
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

    let parentMorph = this.getLowestCommonAncestor(morph1, morph2);

    let propertiesMorph1 = {};
    let propertiesMorph2 = {};
    let propertiesParentMorph = {};

    Object.keys(morph1.propertiesAndPropertySettings().properties).forEach(key => {
      if (key !== 'styleProperties') { propertiesMorph1[key] = morph1[key]; }
    });
    Object.keys(morph2.propertiesAndPropertySettings().properties).forEach(key => {
      if (key !== 'styleProperties') { propertiesMorph2[key] = morph2[key]; }
    });
    Object.keys(parentMorph.propertiesAndPropertySettings().properties).forEach(key => {
      if (key !== 'styleProperties') { propertiesParentMorph[key] = parentMorph[key]; }
    });
    let result = mergeObjects(
      propertiesParentMorph,
      propertiesMorph1,
      propertiesMorph2);
    // TODO conflict resolve
    return new Morph(result.properties);
  }

  static getLowestCommonAncestor (morph1, morph2) {
    const idsOfFirstInSecond = morph1.derivationIDs.map(id => morph2.derivationIDs.indexOf(id));

    let index = idsOfFirstInSecond.length;
    while (index-- && !idsOfFirstInSecond[index]);

    return $world.submorphs.filter(morph => morph.id === idsOfFirstInSecond[index])[0] || new Morph();
  }
}
