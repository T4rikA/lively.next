/* global it, describe, before, beforeEach, after, afterEach */
import { expect } from 'mocha-es6';
import { Differ } from '../differ.js';
import { Morph } from 'lively.morphic';

describe('lively.merger >> Differ', () => {
  let morph1, morph2;
  before(() => {
    morph1 = new Morph();
    morph2 = new Morph();

    morph1.openInWorld();
    morph2.openInWorld();
  });

  describe('#diffMorphsWithIds', () => {
    it('detects if the morphs with the first ID is not alive', () => {
      expect(() => {
        Differ.diffMorphsWithIds('morph1id', 'morph2id');
      }).to.throw('Cant diff morphs, morph1 with id morph1id not found');
    });
    it('detects if the morphs with the second ID is not alive', () => {
      expect(() => {
        Differ.diffMorphsWithIds(morph1.id, 'morph2id');
      }).to.throw('Cant diff morphs, morph2 with id morph2id not found');
    });
    it('runs without error if both morphs are alive', () => {
      expect(() => {
        Differ.diffMorphsWithIds(morph1.id, morph2.id);
      }).not.to.throw();
    });
  });

  describe('#diffMorphs', () => {
    it('detects if non-morphs are to be diffed', () => {
      // TODO
    });
    it('detects if the morphs do not have the same styleclass', () => {
      // TODO
    });
    it("has an empty 'matching' set if the objects to merge are completely different", () => {
      // TODO
    });
    it("has an empty 'differing' set if the objects to merge are the same", () => {
      // TODO
    });
    it("detects the right properties as 'matching' and 'differing'");
  });

  after(() => {
    morph1.abandon();
    morph2.abandon();
  });
});
