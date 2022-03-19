// soruce: https://github.com/falsecz/3-way-merge/blob/master/index.coffee

/**
 * @param {Object} o (original)
 * @param {Object} a (current)
 * @param {Object} b (new)
 * @return {Object} Merged result
*/

let mergeConflicts = [];

class MergeConflict {
  constructor (property, base, a, b) {
    this.property = property;
    this.base = base;
    this.a = a;
    this.b = b;
    this.name = 'MergeException';
    mergeConflicts.push(this);
  }

  toString () {
    return this.name + this.property + this.a + this.b;
  }
}

function isPropertyValueEqual (a, b, property) {
  return (a ? a[property] : undefined) === (b ? b[property] : undefined);
}

function isCompoundObject (obj, property) {
  return typeof (obj ? obj[property] : undefined) === 'object';
}

function threeWayMerge (base, childA, childB, property = undefined) {
  if (base === null) base = {};
  if (childA === null) base = {};
  if (childB === null) base = {};
  if (typeof base !== 'object') throw new Error('Parent must be an object');
  if (typeof childA !== 'object') throw new Error('First child must be an object');
  if (typeof childB !== 'object') throw new Error('Second child must be an object');

  if (typeof base.__provideMergeStrategy__ === 'function') {
    const result = base.__provideMergeStrategy__(childA, childB);
    if (result.mergeResult) return result.mergeResult;
    else {
      new MergeConflict(property, result.mergeConflict.base, result.mergeConflict.a, result.mergeConflict.b);
      return result.mergeConflict.base;
    }
  } else if (Array.isArray(childB)) {
    return mergeArrays(base, childA, childB);
  } else {
    return mergeObjects(base, childA, childB);
  }
}

function mergeObjects (base, childA, childB) {
  let result = {};

  if (Array.isArray(childA)) {
    childA = {};
  }

  for (let property in childB) {
    if (property !== 'style') {
      result[property] = childB[property];
    }
  }

  for (let property in childA) {
    if (property === 'style') continue;

    if (!childA[property] in result) {
      result[property] = childA[property];
    } else {
      if (childA[property] !== result[property]) {
        if (isCompoundObject(childA, property) && isCompoundObject(childB, property)) {
          let newBase = {};
          if (!!base && (property in base) && (typeof base[property] === 'object')) {
            newBase = base[property];
          }
          result[property] = threeWayMerge(newBase, childA[property], childB[property], property);
        } else if (isPropertyValueEqual(childB, base, property)) {
          result[property] = childA[property];
        } else if (base[property] !== childA[property] && base[property] !== childB[property] && childA[property] !== childB[property]) {
          new MergeConflict(property, base[property], childA[property], childB[property]);
          // TODO: change this, when we are able to handle merge conflicts
          result[property] = base[property];
        }
      }
    }
  }
  return result;
}

function mergeArrays (base, childA, childB) {
  let result = [];

  if (!Array.isArray(childA)) {
    childA = [];
  }
  if (!Array.isArray(base)) {
    base = [];
  }

  for (let index in childA) {
    if (childB.includes(childA[index]) || !base.includes(childA[index])) {
      result.push(childA[index]);
    }
  }

  for (let index in childB) {
    if (childA[index] === undefined) {
      result.push(childB[index]);
    } else if (isCompoundObject(childA, index) && isCompoundObject(childB, index)) {
      let newBase = {};
      if (base[index] !== undefined && typeof base[index] === 'object') {
        newBase = base[index];
      }
      result[index] = threeWayMerge(newBase, childA[index], childB[index]);
    } else if (!childA.includes(childB[index])) {
      result.push(childB[index]);
    }
  }
  return result;
}

export function merge (
  base, childA, childB,
  onMergeResult = (properties, mergeConflicts, childA, childB) => { return { properties, mergeConflicts }; }
) {
  mergeConflicts = [];
  let properties = threeWayMerge(base, childA, childB);
  return onMergeResult(properties, mergeConflicts, childA, childB);
}

export function mergeIntoA (base, childA, childB) {
  return merge(base, childA, childB, (properties, mergeConflicts) => {
    Object.keys(properties).forEach(key => {
      if (!childA[key]) {
        childA[key] = properties[key];
      }
    });
    return childA;
  });
}

export function mergeIntoB (base, childA, childB) {
  return mergeIntoA(base, childB, childA);
}
