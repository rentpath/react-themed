var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

var isEmpty = function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

export { isBrowser, isNode, isEmpty };