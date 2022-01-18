/* global describe, it, beforeEach, afterEach, before */
import { expect } from 'mocha-es6';
import { merge } from '../3-way-merger.js';
import { Color, Point } from 'lively.graphics';

describe('lively.merger >> 3-way-merger', () => {
  describe('#merge', () => {
    describe('safety checks', () => {
      let primitiveObjects = ['test', 1, true, undefined, NaN, null];

      it('detects if the base is a primitive type', () => {
        primitiveObjects.forEach(obj => {
          expect(() => {
            merge(obj, {}, {});
          }).to.throw('Parent must be an object');
        });
      });

      it('detects if the first child is a primitive type', () => {
        primitiveObjects.forEach(obj => {
          expect(() => {
            merge({}, obj, {});
          }).to.throw('First child must be an object');
        });
      });

      it('detects if the second child is a primitive type', () => {
        primitiveObjects.forEach(obj => {
          expect(() => {
            merge({}, {}, obj);
          }).to.throw('Second child must be an object');
        });
      });
    });

    describe('merging', () => {
      let base, child1, child2;
      beforeEach(() => {
        base = {
          name: 'test',
          color: Color.red,
          position: new Point(200, 100)
        };

        child1 = {
          name: 'hello there',
          color: Color.red,
          position: new Point(200, 100)
        };

        child2 = {
          name: 'test',
          color: Color.green,
          position: new Point(100, 100)
        };
      });

      it('handles color objects correctly', () => {
        const result = merge(base, child1, child2);
        expect(result.color).to.equal(Color.green);
      });

      it('handles point objects correctly', () => {
        const result = merge(base, child1, child2);
        expect(result.position).to.equal(new Point(100, 100));
      });

      it('merges objects correctly, if there is no conflict', () => {
        const result = merge(base, child1, child2);

        expect(result.name).to.equal('hello there');
        expect(result.color).to.equal(Color.green);
        expect(result.position).to.equal(new Point(100, 100));
      });
    });
  });
});
