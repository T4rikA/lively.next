import { Color } from 'lively.graphics';
export class Differ {
  static diffMorphsWithIds (morph1id, morph2id) {
    const morph1 = $world.submorphs.filter(morph => morph.id === morph1id)[0];
    if (!morph1) {
      throw new Error(`Cannot diff morphs, morph1 with id ${morph1id} not found`);
    }

    const morph2 = $world.submorphs.filter(morph => morph.id === morph2id)[0];
    if (!morph2) {
      throw new Error(`Cannot diff morphs, morph2 with id ${morph2id} not found`);
    }

    return this.diffMorphs(morph1, morph2);
  }

  static diffMorphs (morph1, morph2) {
    if (JSON.stringify(morph1.styleClasses) != JSON.stringify(morph2.styleClasses)) {
      throw new Error('Cannot diff morphs, styleclasses differ');
    }

    const firstMorphProperties = morph1.propertiesAndPropertySettings().properties;
    const secondMorphProperties = morph2.propertiesAndPropertySettings().properties;

    let matchingProperties = {};
    let differingProperties = {};

    for (const [key, value] of Object.entries(firstMorphProperties)) {
      if (key == 'submorphs' && morph1[key].length > 0 && morph2[key].length > 0) {
        // console.log('Uh shit they have submorphs'); // TODO
      }

      if (JSON.stringify(morph1[key]) === JSON.stringify(morph2[key])) {
        matchingProperties[key] = morph1[key];
      } else {
        differingProperties[key] = [morph1[key], morph2[key]];
      }
    }

    // console.log('matching: ', matchingProperties);
    // console.log('different: ', differingProperties);

    return { matchingProperties, differingProperties };
  }
}
