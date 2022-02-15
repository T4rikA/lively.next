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

function specialPropertyResolvingNeeded (valueA, valueB) {
  if (valueA.isColor && valueB.isColor) {
    return true;
  } else if (valueA.isPoint && valueB.isPoint) {
    return true;
  }

  return false;
}

function resolveSpecialProperty (base, childA, childB, property) {
  if (!base.equals(childA) && !base.equals(childB) && !childA.equals(childB)) {
    new MergeConflict(property, base, childA, childB);
    return base; // TODO: should be changed later when merge conflicts can be resolved
  } else { return childA.equals(base) ? childB : childA; }
}

function threeWayMerge (base, childA, childB) {
  if (typeof base !== 'object' || base === null) throw new Error('Parent must be an object');
  if (typeof childA !== 'object' || childA === null) throw new Error('First child must be an object');
  if (typeof childB !== 'object' || childB === null) throw new Error('Second child must be an object');

  if (Array.isArray(childB)) {
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
        if (specialPropertyResolvingNeeded(childA[property], result[property])) {
          result[property] = resolveSpecialProperty(base[property], childA[property], childB[property], property);
        } else if (isCompoundObject(childA, property) && isCompoundObject(childB, property)) {
          let newBase = {};
          if (!!base && (property in base) && (typeof base[property] === 'object')) {
            newBase = base[property];
          } 
          result[property] = threeWayMerge(newBase, childA[property], childB[property]);
        } else if (isPropertyValueEqual(childB, base, property)) {
          result[property] = childA[property];
        } else if (base[property] !== childA[property] && base[property] !== childB[property] && childA[property] !== childB[property]) {
          new MergeConflict(property, base[property], childA[property], childB[property]);
          // TODO: change this, when we are able to handle merge conflicts
          result[property] = childA[property];
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
  onMergeResult = (properties, mergeConflicts) => { return { properties, mergeConflicts }; }
) {
  mergeConflicts = [];
  let properties = threeWayMerge(base, childA, childB);
  return onMergeResult(properties, mergeConflicts);
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
