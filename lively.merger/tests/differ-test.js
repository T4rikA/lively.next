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
  let morphA, morphB;
  beforeEach(() => {
    morphA = new Morph();
    morphB = new Morph();

    morphA.openInWorld();
    morphB.openInWorld();
  });

  afterEach(() => {
    morphA.abandon();
    morphB.abandon();
  });

  describe('#diffMorphsWithIds', () => {
    it('detects if the morphs with the first ID is not alive', () => {
      expect(() => {
        Differ.diffMorphsWithIds('morphAid', 'morphBid');
      }).to.throw('Cannot diff morphs, morphA with id morphAid not found');
    });

    it('detects if the morphs with the second ID is not alive', () => {
      expect(() => {
        Differ.diffMorphsWithIds(morphA.id, 'morphBid');
      }).to.throw('Cannot diff morphs, morphB with id morphBid not found');
    });
  });

  describe('#diffMorphs', () => {
    it('detects if non-morphs are to be diffed', () => {
      expect(() => {
        Differ.diffMorphs({}, {});
      }).to.throw('Cannot diff objects that are not morphs');
    });

    it('detects if the morphs do not have the same styleclass', () => {
      morphA.abandon();
      morphA = new Ellipse();
      morphA.openInWorld();

      expect(() => {
        Differ.diffMorphs(morphA, morphB);
      }).to.throw('Cannot diff morphs, styleclasses differ');
    });

    it("has an empty 'differing' set if the objects to merge are the same", () => {
      const diffingResult = Differ.diffMorphs(morphA, morphA);

      expect(isEmpty(diffingResult.differingProperties));
    });

    it("has a 'matching' set that equals the objects to merge if they are the same", () => {
      let allProperties = {};
      for (const [key, value] of Object.entries(morphA.propertiesAndPropertySettings().properties)) {
        allProperties[key] = morphA[key];
      }
      allProperties = JSON.stringify(allProperties);

      const diffingResult = Differ.diffMorphs(morphA, morphA);
      let matchingProperties = JSON.stringify(diffingResult.matchingProperties);

      expect(matchingProperties).to.equal(allProperties);
    });

    it("detects a changed property as 'differing'", () => {
      morphB.fill = Color.red;

      const diffingResult = Differ.diffMorphs(morphA, morphB);

      expect(Object.keys(diffingResult.differingProperties).includes('fill'));
      expect(!Object.keys(diffingResult.matchingProperties).includes('fill'));
    });

    it("detects a equally set property as 'matching'", () => {
      morphA.fill = Color.red;
      morphB.fill = Color.red;

      const diffingResult = Differ.diffMorphs(morphA, morphB);

      expect(!Object.keys(diffingResult.differingProperties).includes('fill'));
      expect(Object.keys(diffingResult.matchingProperties).includes('fill'));
    });
  });
});
