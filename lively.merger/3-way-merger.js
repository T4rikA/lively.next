// soruce: https://github.com/falsecz/3-way-merge/blob/master/index.coffee

/**
 * @param {Object} o (original)
 * @param {Object} a (current)
 * @param {Object} b (new)
 * @return {Object} Merged result
*/

export function merge (o, a, b) {
  let isArray, k, ov, result;
  if (typeof o !== 'object') throw new Error('Merge original document must be an object!');
  if (typeof a !== 'object') throw new Error('Merge current document must be an object!');
  if (typeof b !== 'object') throw new Error('Merge new document must be an object!');

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
    for (k in b) result[k] = b[k];
    for (k in a) {
      if (!a[k] in result) {
        result[k] = a[k];
      } else if (a[k] !== result[k]) {
        if (typeof a[k] === 'object' && typeof (b ? b[k] : undefined) === 'object') {
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
