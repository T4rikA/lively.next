// soruce: https://github.com/falsecz/3-way-merge/blob/master/index.coffee

/**
 * @param {Object} o (original)
 * @param {Object} a (current)
 * @param {Object} b (new)
 * @return {Object} Merged result
*/

let mergeConflicts = [];

class MergeConflict {
  constructor (property, a, b) {
    this.property = property;
    this.a = a;
    this.b = b;
    this.name = 'MergeException';
    mergeConflicts.push(this); 
  }
  
  toString () {
    return this.name + this.property + this.a + this.b;
  }
}

function nullSafeEqual (a, b, property) {
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
    new MergeConflict(property, childA, childB);
    return base; // TODO: should be changed later when merge conflicts can be resolved
  } else { return childA.equals(base) ? childB : childA; }
}

function merge (base, childA, childB) {
  if (typeof base !== 'object' || base === null) throw new Error('Parent must be an object');
  if (typeof childA !== 'object' || childA === null) throw new Error('First child must be an object');
  if (typeof childB !== 'object' || childB === null) throw new Error('Second child must be an object');

  if (Array.isArray(childB)) {
    return _mergeArrays(base, childA, childB);
  } else {
    return _mergeObjects(base, childA, childB); 
  }
}

function _mergeObjects (base, childA, childB) {
  let result;
  
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
          result[property] = merge(newBase, childA[property], childB[property]);
        } else if (nullSafeEqual(childB, base, property)) {
          result[property] = childA[property];
        }
      }
    }
  }
  return result;
}

function _mergeArrays (base, childA, childB) {
  let result;
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
      result[index] = merge(newBase, childA[index], childB[index]);
    } else if (!childA.includes(childB[index])) {
      result.push(childB[index]);    
    }
  }
  return result;  
}

export function mergeObjects (
  base, childA, childB, 
  onMergeResult = (properties, mergeConflicts) => { return { properties, mergeConflicts }; }
) {
  mergeConflicts = [];
  let properties = merge(base, childA, childB);
  return onMergeResult(properties, mergeConflicts);
}

export function mergeObjectsIntoA (base, childA, childB) {
  return mergeObjects(base, childA, childB, (properties, mergeConflicts) => {
    Object.keys(properties).forEach(key => {
      if (!childA[key]) {
        childA[key] = properties[key];
      }
    });
    return childA;
  });
}

export function mergeObjectsIntoB (base, childA, childB) {
  return mergeObjectsIntoA(base, childB, childA);
}
