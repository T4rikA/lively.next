/* global describe, it, beforeEach */
import { expect, chai } from 'mocha-es6';
import spies from 'https://jspm.dev/chai-spies';
chai.use(spies);

import { merge, mergeIntoB, mergeIntoA } from '../3-way-merger.js';
import { Color, Point } from 'lively.graphics';

describe('lively.merger >> 3-way-merger', () => {
  describe('#mergeInto{A|B}', () => {
    let base, childA, childB;
    
    beforeEach(() => {
      base = { a: 1 };
      childA = { a: 1, b: 2, c: 4 };
      childB = { a: 2, c: 5 };
    });
    
    it('mergeIntoA alters the a object', () => {
      mergeIntoA(base, childA, childB);
      expect(childA).to.eql({ a: 1, b: 2, c: 4 });
    });

    it('mergeIntoA returns the a object', () => {
      expect(mergeIntoA(base, childA, childB)).to.equal(childA);
    });

    it('mergeIntoB alters the b object', () => {
      mergeIntoB(base, childA, childB);
      expect(childB).to.eql({ a: 2, b: 2, c: 5 });
    });

    it('mergeIntoB returns the b object', () => {
      expect(mergeIntoB(base, childA, childB)).to.equal(childB);
    });
  });
  
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
      let base, childA, childB;
      beforeEach(() => {
        base = {
          name: 'test',
          color: Color.red,
          position: new Point(200, 100),
          count: 20
        };

        childA = {
          name: 'hello there',
          color: Color.red,
          position: new Point(200, 100),
          count: 30
        };

        childB = {
          name: 'test',
          color: Color.green,
          position: new Point(100, 100),
          count: 40
        };
      });

      it('handles color objects correctly', () => {
        const result = merge(base, childA, childB);
        expect(result.properties.color).to.equal(Color.green);
      });

      it('handles point objects correctly', () => {
        const result = merge(base, childA, childB);
        expect(result.properties.position).to.equal(new Point(100, 100));
      });

      it('merges objects correctly, if there is no conflict', () => {
        const result = merge(base, childA, childB);

        expect(result.properties.name).to.equal('hello there');
        expect(result.properties.color).to.equal(Color.green);
        expect(result.properties.position).to.equal(new Point(100, 100));
      });

      it('calls the onMergeConflic callback, if given', () => {
        const callback = (properties, mergeConflicts) => {};
        const method = chai.spy(callback);
        
        merge(base, childA, childB, callback);
        expect(method).to.have.been.called;
      });

      it('detects a conflict for simple key-value pairs', () => {
        const result = merge(base, childA, childB);

        expect(result.mergeConflicts.length).to.equal(1);

        const mergeConflict = result.mergeConflicts[0];

        expect(mergeConflict.property).to.equal('count');
        expect(mergeConflict.a).to.equal(childA.count);
        expect(mergeConflict.b).to.equal(childB.count);
      });
    });
  });
});