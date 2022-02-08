/* global describe, it, beforeEach, afterEach */
import { expect, chai } from 'mocha-es6';
import spies from 'https://jspm.dev/chai-spies';
import chaiAsPromised from 'https://jspm.dev/chai-as-promised';
chai.use(chaiAsPromised);
chai.use(spies);

import { Morph, Ellipse } from 'lively.morphic';
import { Color } from 'lively.graphics';
import { getLowestCommonAncestor, mergeMorphs, mergeMorphsWithIds, mergeMorphsIntoB, mergeMorphsIntoA, mergeMorphsWithIdsIntoB, mergeMorphsWithIdsIntoA, propertiesFromMorph } from '../merger.js';

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
    it('detects the correct parent when it is in the world', async () => {
      const result = await getLowestCommonAncestor(morphA, morphB);
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

    it('returns an empty morph if there is no parent', async () => {
      const result = await getLowestCommonAncestor(new Morph(), new Morph());
      expect(result.propertiesAndPropertySettings().properties).to.equal((new Morph()).propertiesAndPropertySettings().properties);
    });
  });

  describe('#propertiesFromMorph', () => {
    it('returns all non derived properties', () => {
      const properties = propertiesFromMorph(morphA);
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
    
    it('mergeMorphsWithIdsIntoA returns a reference to morphA', async () => {
      expect(await mergeMorphsWithIdsIntoA(morphA.id, morphB.id)).to.equal(morphA);
    });

    it('mergeMorphsWithIdsIntoB returns a reference to morphB', async () => {
      expect(await mergeMorphsWithIdsIntoB(morphA.id, morphB.id)).to.equal(morphB);
    });

    it('mergeMorphsIntoA returns a reference to morphA', async () => {
      expect(await mergeMorphsIntoA(morphA, morphB)).to.equal(morphA);
    });

    it('mergeMorphsIntoB returns a reference to morphB', async () => {
      expect(await mergeMorphsIntoB(morphA, morphB)).to.equal(morphB);
    });

    it('mergeMorphsWithIdsIntoA alters morphA correctly', async () => {
      await mergeMorphsWithIdsIntoA(morphA.id, morphB.id);
      expect(morphA.fill).to.equal(Color.red);
      expect(morphA.name).to.equal('name2');
    });

    it('mergeMorphsWithIdsIntoB alters morphB correctly', async () => {
      await mergeMorphsWithIdsIntoB(morphA.id, morphB.id);
      expect(morphB.fill).to.equal(Color.red);
      expect(morphB.name).to.equal('name2');
    });

    it('mergeMorphsIntoA alters morphA correctly', async () => {
      await mergeMorphsIntoA(morphA.id, morphB.id);
      expect(morphB.fill).to.equal(Color.red);
      expect(morphB.name).to.equal('name2');
    });

    it('mergeMorphsIntoB alters morphB correctly', async () => {
      await mergeMorphsIntoB(morphA.id, morphB.id);
      expect(morphB.fill).to.equal(Color.red);
      expect(morphB.name).to.equal('name2');
    });
  });

  describe('#mergeMorphsWithIds', () => {
    it('detects if the morphs with the first ID is not alive', async function () {
      expect(mergeMorphsWithIds('morphAid', 'morphBid')).to.be.rejectedWith('Cannot merge morphs, morphA with id morphAid not found');
    });

    it('detects if the morphs with the second ID is not alive', async () => {
      expect(mergeMorphsWithIds(morphA.id, 'morphBid')).to.eventually.be.rejectedWith('Cannot merge morphs, morphB with id morphBid not found');
    });

    it('calls the onMergeResult callback, if given', async () => {
      const callback = (properties, mergeConflicts) => {};
      const method = chai.spy(callback);
      
      await mergeMorphsWithIds(morphA.id, morphB.id, callback);
      expect(method).to.have.been.called; 
    });
  });

  describe('#mergeMorphs', () => {
    it('detects if non-morphs are to be merged', async () => {
      expect(mergeMorphs({}, {})).to.be.rejectedWith('Cannot merge objects that are not morphs');
    });

    it('detects if the morphs do not have the same styleclass', () => {
      morphA.abandon();
      morphA = new Ellipse();
      morphA.openInWorld();
      
      expect(mergeMorphs(morphA, morphB)).to.be.rejectedWith('Cannot merge morphs, styleclasses differ');
    });

    it('returns a morph', async () => {
      expect(await mergeMorphs(morphA, morphB)).to.be.an.instanceOf(Morph);
    });

    it('returns a morph with combined properties', async () => {
      morphA.fill = Color.red;
      morphB.name = 'name2';

      const result = await mergeMorphs(morphA, morphB);
      expect(result.name).to.equal('name2');
      expect(result.fill).to.equal(Color.red);
    });

    it('calls the onMergeResult callback, if given', async () => {
      const callback = (properties, mergeConflicts) => {};
      const method = chai.spy(callback);
      
      await mergeMorphs(morphA, morphB, callback);
      expect(method).to.have.been.called;
    });
  });
});
