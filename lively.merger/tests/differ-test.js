/* global describe, it, beforeEach, afterEach */
import { expect } from 'mocha-es6';
import { Differ } from '../differ.js';
import { Morph, Ellipse } from 'lively.morphic';
import { Color } from 'lively.graphics';

function isEmpty (obj) {
  for (let x in obj) {
    if (obj.hasOwnProperty(x)) {
      return false;
    }
  }
  return true;
}

describe('lively.merger >> Differ', () => {
  let morph1, morph2;
  beforeEach(() => {
    morph1 = new Morph();
    morph2 = new Morph();

    morph1.openInWorld();
    morph2.openInWorld();
  });

  afterEach(() => {
    morph1.abandon();
    morph2.abandon();
  });

  describe('#diffMorphsWithIds', () => {
    it('detects if the morphs with the first ID is not alive', () => {
      expect(() => {
        Differ.diffMorphsWithIds('morph1id', 'morph2id');
      }).to.throw('Cannot diff morphs, morph1 with id morph1id not found');
    });

    it('detects if the morphs with the second ID is not alive', () => {
      expect(() => {
        Differ.diffMorphsWithIds(morph1.id, 'morph2id');
      }).to.throw('Cannot diff morphs, morph2 with id morph2id not found');
    });

    it('runs without error if both morphs are alive', () => {
      expect(() => {
        Differ.diffMorphsWithIds(morph1.id, morph2.id);
      }).not.to.throw();
    });
  });

  describe('#diffMorphs', () => {
    it('detects if non-morphs are to be diffed', () => {
      expect(() => {
        Differ.diffMorphs({}, {});
      }).to.throw('Cannot diff objects that are not morphs');
    });

    it('detects if the morphs do not have the same styleclass', () => {
      morph1.abandon();
      morph1 = new Ellipse();
      morph1.openInWorld();

      expect(() => {
        Differ.diffMorphs(morph1, morph2);
      }).to.throw('Cannot diff morphs, styleclasses differ');
    });

    it("has an empty 'differing' set if the objects to merge are the same", () => {
      const diffingResult = Differ.diffMorphs(morph1, morph1);

      expect(isEmpty(diffingResult.differingProperties));
    });

    it("has a 'matching' set that equals the objects to merge if they are the same", () => {
      let allProperties = {};
      for (const [key, value] of Object.entries(morph1.propertiesAndPropertySettings().properties)) {
        allProperties[key] = morph1[key];
      }
      allProperties = JSON.stringify(allProperties);

      const diffingResult = Differ.diffMorphs(morph1, morph1);
      let matchingProperties = JSON.stringify(diffingResult.matchingProperties);

      expect(matchingProperties).to.equal(allProperties);
    });

    it("detects a changed property as 'differing'", () => {
      morph2.fill = Color.red;

      const diffingResult = Differ.diffMorphs(morph1, morph2);

      expect(Object.keys(diffingResult.differingProperties).includes('fill'));
      expect(!Object.keys(diffingResult.matchingProperties).includes('fill'));
    });

    it("detects a equally set property as 'matching'", () => {
      morph1.fill = Color.red;
      morph2.fill = Color.red;

      const diffingResult = Differ.diffMorphs(morph1, morph2);

      expect(!Object.keys(diffingResult.differingProperties).includes('fill'));
      expect(Object.keys(diffingResult.matchingProperties).includes('fill'));
    });
  });
});
