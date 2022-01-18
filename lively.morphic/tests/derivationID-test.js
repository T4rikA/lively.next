/* global describe, it, beforeEach, afterEach */
import { expect } from 'mocha-es6';
import { Morph } from 'lively.morphic';

describe('lively.merger >> Differ', () => {
  let morph1, morph2;
  beforeEach(() => {
    morph1 = new Morph();
    morph2 = morph1.copy();

    morph1.openInWorld();
    morph2.openInWorld();
  });

  describe('derivationId', () => {
    it('has own ID as derivationId', () => {
      expect(morph1.derivationIds).to.include(morph1.id);
    });

    it('has derivation Id of parent morph', () => {
      expect(morph2.derivationIds).to.include(morph1.id);
    });
  });
  
  afterEach(() => {
    morph1.abandon();
    morph2.abandon();
  });
});
