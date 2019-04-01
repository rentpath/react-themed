function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var combineFunctions = function combineFunctions(fn1, fn2) {
  return function () {
    var res1 = fn1();
    var res2 = fn2();
    return typeof res1 === 'string' && typeof res2 === 'string' ? "".concat(res1).concat(res2) : undefined;
  };
};

var composeThemes = function composeThemes(target, mixin) {
  if (!mixin) return target;
  return Object.keys(mixin).reduce(function (acc, key) {
    switch (_typeof(acc[key])) {
      case 'undefined':
        if (mixin[key] !== null) {
          acc[key] = mixin[key];
        }

        break;

      case 'string':
        if (typeof mixin[key] === 'string') {
          acc[key] = [target[key], mixin[key]].filter(function (x) {
            return x;
          }).join(' ');
        }

        break;

      case 'object':
        if (_typeof(mixin[key]) === 'object') {
          composeThemes(acc[key], mixin[key]);
        }

        break;

      case 'function':
        if (typeof mixin[key] === 'function') {
          acc[key] = combineFunctions(acc[key], mixin[key]);
        }

        break;

      default: // no default

    }

    return acc;
  }, target);
};

export default function compose() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var _len = arguments.length, themes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    themes[_key - 1] = arguments[_key];
  }

  // Minor optimization to skip reduce on already composed theme
  if (themes.length === 1) {
    return composeThemes(target, themes[0]);
  }

  return themes.reduce(function (acc, theme) {
    return composeThemes(acc, theme);
  }, target);
}