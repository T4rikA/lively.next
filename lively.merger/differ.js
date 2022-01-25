
export class Differ {
  static diffMorphsWithIds (morphAid, morphBid) {
    const morphA = $world.submorphs.filter(morph => morph.id === morphAid)[0];
    if (!morphA) {
      throw new Error(`Cannot diff morphs, morphA with id ${morphAid} not found`);
    }

    const morphB = $world.submorphs.filter(morph => morph.id === morphBid)[0];
    if (!morphB) {
      throw new Error(`Cannot diff morphs, morphB with id ${morphBid} not found`);
    }

    return this.diffMorphs(morphA, morphB);
  }

  static diffMorphs (morphA, morphB) {
    if (!morphA.styleClasses || !morphA.styleClasses.includes('morph') || !morphB.styleClasses || !morphB.styleClasses.includes('morph')) {
      throw new Error('Cannot diff objects that are not morphs');
    }

    if (JSON.stringify(morphA.styleClasses) !== JSON.stringify(morphB.styleClasses)) {
      throw new Error('Cannot diff morphs, styleclasses differ');
    }

    const firstMorphProperties = morphA.propertiesAndPropertySettings().properties;

    let matchingProperties = {};
    let differingProperties = {};

    for (const [key, value] of Object.entries(firstMorphProperties)) {
      if (key === 'submorphs' && morphA[key].length > 0 && morphB[key].length > 0) {
        // TODO
      }

      if (JSON.stringify(morphA[key]) === JSON.stringify(morphB[key])) {
        matchingProperties[key] = morphA[key];
      } else {
        differingProperties[key] = [morphA[key], morphB[key]];
      }
    }

    // console.log('matching: ', matchingProperties);
    // console.log('different: ', differingProperties);

    return { matchingProperties, differingProperties };
  }
}
