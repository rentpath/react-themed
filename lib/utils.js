"use strict";

exports.__esModule = true;
exports.isEmpty = exports.isNode = exports.isBrowser = void 0;
var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
exports.isBrowser = isBrowser;
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
exports.isNode = isNode;

var isEmpty = function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

exports.isEmpty = isEmpty;