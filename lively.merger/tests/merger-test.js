/* global describe, it, beforeEach, afterEach */
import { expect, chai } from 'mocha-es6';
import spies from 'https://jspm.dev/chai-spies';
chai.use(spies);

import { Merger } from '../merger.js';
import { Morph, Ellipse } from 'lively.morphic';
import { Color } from 'lively.graphics';

describe('lively.merger >> Merger', () => {
  let parent, morphA, morphB;
  beforeEach(() => {
    parent = new Morph();
    morphA = parent.copy();
    morphB = parent.copy();

    parent.openInWorld();
    morphA.openInWorld();
    morphB.openInWorld();
  });

  afterEach(() => {
    parent.abandon();
    morphA.abandon();
    morphB.abandon();
  });

  describe('#getLowestCommonAncestor', () => {
    it('detects the correct parent when it is in the world', () => {
      const result = Merger.getLowestCommonAncestor(morphA, morphB);

      expect(result.id).to.equal(parent.id);
    });

    /*
    // this is currently not implemented, as we decided to do this later
    // because we didn't want to mess with MorphicDB right now
    it('detects the correct parent when it is not in the world', () => {
      
      parent.remove();
      const result = Merger.getLowestCommonAncestor(morphA, morphB);

      expect(result.id).to.equal(parent.id);
    });
    */

    it('returns an empty morph if there is no parent', () => {
      const result = Merger.getLowestCommonAncestor(new Morph(), new Morph());
      expect(result.propertiesAndPropertySettings().properties).to.equal((new Morph()).propertiesAndPropertySettings().properties);
    });
  });

  describe('#propertiesFromMorph', () => {
    it('returns all non derived properties', () => {
      const properties = Merger.propertiesFromMorph(morphA);
      Object.filter = (obj, predicate) => 
        Object.keys(obj)
          .filter(key => predicate(obj[key]))
          .reduce((res, key) => (res[key] = obj[key], res), {});
      
      const referenceProperties = Object.filter(morphA.propertiesAndPropertySettings().properties, property => !property.derived);

      Object.keys(referenceProperties).forEach(key => {
        if (key !== 'styleProperties') expect(properties).to.have.property(key);
      });

      Object.keys(properties).forEach(key => {
        expect(referenceProperties).to.have.property(key);
      });
    });
  });

  describe('#mergeMorphs(WithIds)Into{A|B}', () => {
    beforeEach(() => {
      morphA.fill = Color.red;
      morphB.name = 'name2';
    });
    
    it('mergeMorphsWithIdsIntoA returns a reference to morphA', () => {
      expect(Merger.mergeMorphsWithIdsIntoA(morphA.id, morphB.id)).to.equal(morphA);
    });

    it('mergeMorphsWithIdsIntoB returns a reference to morphB', () => {
      expect(Merger.mergeMorphsWithIdsIntoB(morphA.id, morphB.id)).to.equal(morphB);
    });

    it('mergeMorphsIntoA returns a reference to morphA', () => {
      expect(Merger.mergeMorphsIntoA(morphA, morphB)).to.equal(morphA);
    });

    it('mergeMorphsIntoB returns a reference to morphB', () => {
      expect(Merger.mergeMorphsIntoB(morphA, morphB)).to.equal(morphB);
    });

    it('mergeMorphsWithIdsIntoA alters morphA correctly', () => {
      Merger.mergeMorphsWithIdsIntoA(morphA.id, morphB.id);
      expect(morphA.fill).to.equal(Color.red);
      expect(morphA.name).to.equal('name2');
    });

    it('mergeMorphsWithIdsIntoB alters morphB correctly', () => {
      Merger.mergeMorphsWithIdsIntoB(morphA.id, morphB.id);
      expect(morphB.fill).to.equal(Color.red);
      expect(morphB.name).to.equal('name2');
    });

    it('mergeMorphsIntoA alters morphA correctly', () => {
      Merger.mergeMorphsIntoA(morphA, morphB);
      expect(morphA.fill).to.equal(Color.red);
      expect(morphA.name).to.equal('name2');
    });

    it('mergeMorphsIntoB alters morphB correctly', () => {
      Merger.mergeMorphsIntoB(morphA, morphB);
      expect(morphB.fill).to.equal(Color.red);
      expect(morphB.name).to.equal('name2');
    });
  });

  describe('#mergeMorphsWithIds', () => {
    it('detects if the morphs with the first ID is not alive', () => {
      expect(() => {
        Merger.mergeMorphsWithIds('morphAid', 'morphBid');
      }).to.throw('Cannot merge morphs, morphA with id morphAid not found');
    });

    it('detects if the morphs with the second ID is not alive', () => {
      expect(() => {
        Merger.mergeMorphsWithIds(morphA.id, 'morphBid');
      }).to.throw('Cannot merge morphs, morphB with id morphBid not found');
    });

    it('calls the onMergeResult callback, if given', () => {
      const callback = (properties, mergeConflicts) => {};
      const method = chai.spy(callback);
      
      Merger.mergeMorphsWithIds(morphA.id, morphB.id, callback);
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
      morphA.abandon();
      morphA = new Ellipse();
      morphA.openInWorld();

      expect(() => {
        Merger.mergeMorphs(morphA, morphB);
      }).to.throw('Cannot merge morphs, styleclasses differ');
    });

    it('returns a morph', () => {
      const merged = Merger.mergeMorphs(morphA, morphB);

      expect(merged).to.be.an.instanceOf(Morph);
    });

    it('returns a morph with combined properties', () => {
      morphA.fill = Color.red;
      morphB.name = 'name2';

      const merged = Merger.mergeMorphs(morphA, morphB);

      expect(merged.name).to.equal('name2');
      expect(merged.fill).to.equal(Color.red);
    });

    it('calls the onMergeResult callback, if given', () => {
      const callback = (properties, mergeConflicts) => {};
      const method = chai.spy(callback);
      
      Merger.mergeMorphs(morphA, morphB, callback);
      expect(method).to.have.been.called;
    });
  });
});