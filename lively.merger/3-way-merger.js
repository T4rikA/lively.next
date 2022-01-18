// soruce: https://github.com/falsecz/3-way-merge/blob/master/index.coffee

/**
 * @param {Object} o (original)
 * @param {Object} a (current)
 * @param {Object} b (new)
 * @return {Object} Merged result
*/

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

let mergeConflicts = [];

export function mergeObjects (o, a, b) {
  let properties = merge(o, a, b);
  return {
    properties: properties,
    mergeConflicts: mergeConflicts
  };
}

function resolveSpecialProperty (o, a, b, k) {
  if (!o.equals(a) && !o.equals(b) && !a.equals(b)) {
    new MergeConflict(k, a, b);
    return o; // TODO: should be changed later when merge conflicts can be resolved
  } else { return a.equals(o) ? b : a; }
}

function merge (o, a, b) {
  let isArray, k, ov, result;
  if (typeof o !== 'object' || o === null) throw new Error('Parent must be an object');
  if (typeof a !== 'object' || a === null) throw new Error('First child must be an object');
  if (typeof b !== 'object' || b === null) throw new Error('Second child must be an object');

  isArray = Array.isArray(b);
  result = isArray ? [] : {};
  if (isArray) {
    if (!Array.isArray(a)) a = [];
    if (!Array.isArray(o)) o = [];
    for (k in a) {
      if (b.includes(a[k]) || !o.includes(a[k])) {
        result.push(a[k]);
      }
    }

    for (k in b) {
      if (!a.includes(k)) {
        result.push(b[k]);
      } else if (typeof a[k] === 'object' && typeof b[k] === 'object') {
        ov = o.includes(k) && typeof o[k] === 'object' ? o[k] : {};
        result[k] = merge(ov, a[k], b[k]);
      } else if (!a.includes(b[k])) {
        result.push(b[k]);
      }
    }
  } else {
    if (Array.isArray(a)) a = {};
    for (k in b) if (k !== 'style') result[k] = b[k];
    for (k in a) {
      if (k === 'style') continue;
      if (!a[k] in result) {
        result[k] = a[k];
      } else if (a[k] !== result[k]) {
        if (a[k].isColor && result[k].isColor) {
          result[k] = resolveSpecialProperty(o[k], a[k], b[k], k);
        } else if (a[k].isPoint && result[k].isPoint) {
          result[k] = resolveSpecialProperty(o[k], a[k], b[k], k);
        } else if (typeof a[k] === 'object' && typeof (b ? b[k] : undefined) === 'object') {
          ov = !!o && k in o && typeof o[k] === 'object' ? o[k] : {};
          result[k] = merge(ov, a[k], b[k]);
        } else if ((b ? b[k] : undefined) === (o ? o[k] : undefined)) {
          result[k] = a[k];
        }
      }
    }
  }
  return result;
}
