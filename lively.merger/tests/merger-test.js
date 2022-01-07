/* global describe, it, beforeEach, afterEach */
import { expect } from 'mocha-es6';
import { Merger } from '../merger.js';
import { Morph, Ellipse } from 'lively.morphic';
import { Color } from 'lively.graphics';

describe('lively.merger >> Merger', () => {
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

  describe('#isMorph', () => {
    it('returns true on morphs', () => {
      expect(Merger.isMorph(morph1)).to.be.true;
    });

    it('returns true on morph subclasses', () => {
      class tmp extends Morph {}
      expect(Merger.isMorph(new tmp())).to.be.true;
    });

    it('returns false on javascript dictionaries', () => {
      expect(Merger.isMorph({})).to.be.falsey;
    });

    it('returns false on javascript arrays', () => {
      expect(Merger.isMorph([])).to.be.falsey;
    });

    it('returns false on custom objects that are not morph subclasses', () => {
      class tmp {}
      expect(Merger.isMorph(new tmp())).to.be.falsey;
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
  });
});
