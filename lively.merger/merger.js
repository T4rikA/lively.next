import { Differ } from './differ.js';
import { merge } from './3-way-merger.js';
import { Morph } from 'lively.morphic';

export class Merger {
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
    if (!morph1.styleClasses || !morph1.styleClasses.includes('morph') || !morph2.styleClasses || !morph2.styleClasses.includes('morph')) {
      throw new Error('Cannot merge objects that are not morphs');
    }

    if (JSON.stringify(morph1.styleClasses) != JSON.stringify(morph2.styleClasses)) {
      throw new Error('Cannot merge morphs, styleclasses differ');
    }

    let testMorph = new Morph();
    let propertiesMorph1 = {};
    let propertiesMorph2 = {};
    let propertiesTestMorph = {};
    Object.keys(morph1.propertiesAndPropertySettings().properties).forEach(key => {
      if (key !== 'styleProperties') { propertiesMorph1[key] = morph1[key]; }
    });
    Object.keys(morph2.propertiesAndPropertySettings().properties).forEach(key => {
      if (key !== 'styleProperties') { propertiesMorph2[key] = morph2[key]; }
    });
    Object.keys(testMorph.propertiesAndPropertySettings().properties).forEach(key => {
      if (key !== 'styleProperties') { propertiesTestMorph[key] = testMorph[key]; }
    });
    let properties = merge(propertiesTestMorph,
      propertiesMorph1,
      propertiesMorph2);
    return new Morph(properties);
  }
}
