/* global describe, it, beforeEach, afterEach */
import { expect, chai } from 'mocha-es6';
import spies from 'https://jspm.dev/chai-spies';
chai.use(spies);

import { Merger } from '../merger.js';
import { Morph, Ellipse } from 'lively.morphic';
import { Color } from 'lively.graphics';

describe('lively.merger >> Merger', () => {
  let parent, morph1, morph2;
  beforeEach(() => {
    parent = new Morph();
    morph1 = parent.copy();
    morph2 = parent.copy();

    parent.openInWorld();
    morph1.openInWorld();
    morph2.openInWorld();
  });

  afterEach(() => {
    parent.abandon();
    morph1.abandon();
    morph2.abandon();
  });

  describe('#getLowestCommonAncestor', () => {
    it('detects the correct parent when it is in the world', () => {
      const result = Merger.getLowestCommonAncestor(morph1, morph2);

      expect(result.id).to.equal(parent.id);
    });

    /*
    // this is currently not implemented, as we decided to do this later
    // because we didn't want to mess with MorphicDB right now
    it('detects the correct parent when it is not in the world', () => {
      
      parent.remove();
      const result = Merger.getLowestCommonAncestor(morph1, morph2);

      expect(result.id).to.equal(parent.id);
    });
    */

    it('returns an empty morph if there is no parent', () => {
      const result = Merger.getLowestCommonAncestor(new Morph(), new Morph());
      expect(result.propertiesAndPropertySettings().properties).to.equal((new Morph()).propertiesAndPropertySettings().properties);
    });
  });

  describe('#propertiesFromMorph', () => {
    it('returns all properties except styleProperties', () => {
      const properties = Merger.propertiesFromMorph(morph1);
      const referenceProperties = morph1.propertiesAndPropertySettings().properties;

      Object.keys(referenceProperties).forEach(key => {
        if (key !== 'styleProperties') expect(properties).to.have.property(key);
      });

      Object.keys(properties).forEach(key => {
        expect(referenceProperties).to.have.property(key);
      });
    });
  });

  describe('#mergeMorphsWithIds', () => {
    it('detects if the morphs with the first ID is not alive', () => {
      expect(() => {
        Merger.mergeMorphsWithIds('morph1id', 'morph2id');
      }).to.throw('Cannot merge morphs, morph1 with id morph1id not found');
    });

    it('detects if the morphs with the second ID is not alive', () => {
      expect(() => {
        Merger.mergeMorphsWithIds(morph1.id, 'morph2id');
      }).to.throw('Cannot merge morphs, morph2 with id morph2id not found');
    });

    it('calls the onMergeResult callback, if given', () => {
      const callback = (properties, mergeConflicts) => {};
      const method = chai.spy(callback);
      
      Merger.mergeMorphsWithIds(morph1.id, morph2.id, callback);
      expect(method).to.have.been.called;
    });
  });

  describe('#mergeMorphs', () => {
    it('detects if non-morphs are to be merged', () => {
      expect(() => {
        Merger.mergeMorphs({}, {});
      }).to.throw('Cannot merge objects that are not morphs');
    });

    it('detects if the morphs do not have the same styleclass', () => {
      morph1.abandon();
      morph1 = new Ellipse();
      morph1.openInWorld();

      expect(() => {
        Merger.mergeMorphs(morph1, morph2);
      }).to.throw('Cannot merge morphs, styleclasses differ');
    });

    it('returns a morph', () => {
      const merged = Merger.mergeMorphs(morph1, morph2);

      expect(merged).to.be.an.instanceOf(Morph);
    });

    it('returns a morph with combined properties', () => {
      morph1.fill = Color.red;
      morph2.name = 'name2';

      const merged = Merger.mergeMorphs(morph1, morph2);

      expect(merged.name).to.equal('name2');
      expect(merged.fill).to.equal(Color.red);
    });

    it('calls the onMergeResult callback, if given', () => {
      const callback = (properties, mergeConflicts) => {};
      const method = chai.spy(callback);
      
      Merger.mergeMorphs(morph1, morph2, callback);
      expect(method).to.have.been.called;
    });
  });
});
