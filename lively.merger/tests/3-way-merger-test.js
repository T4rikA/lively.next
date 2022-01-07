/* global describe, it, beforeEach, afterEach, before */
import { expect } from 'mocha-es6';
import { merge } from '../3-way-merger.js';
import { Color } from 'lively.graphics';

describe('lively.merger >> 3-way-merger', () => {
  describe('#merge', () => {
    describe('safety checks', () => {
      let primitiveObjects = ['test', 1, true, undefined, NaN, null];

      it('detects if the base is a primitive type', () => {
        primitiveObjects.forEach(obj => {
          expect(() => {
            merge(obj, {}, {});
          }).to.throw('Merge original document must be an object!');
        });
      });

      it('detects if the first child is a primitive type', () => {
        primitiveObjects.forEach(obj => {
          expect(() => {
            merge({}, obj, {});
          }).to.throw('Merge current document must be an object!');
        });
      });

      it('detects if the second child is a primitive type', () => {
        primitiveObjects.forEach(obj => {
          expect(() => {
            merge({}, {}, obj);
          }).to.throw('Merge new document must be an object!');
        });
      });
    });
    describe('merging', () => {
      let base, child1, child2;
      beforeEach(() => {
        base = {
          name: 'test',
          color: Color.red
        };

        child1 = {
          name: 'hello there',
          color: Color.red
        };

        child2 = {
          name: 'test',
          color: Color.green
        };
      });
    });
  });
});
