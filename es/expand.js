export default function expand(source) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$separator = _ref.separator,
      separator = _ref$separator === void 0 ? '-' : _ref$separator;

  var theme = {};
  Object.keys(source).forEach(function (path) {
    var matches = path.match(/[A-Za-z]+[^A-Z]+/g);
    if (!matches) return;
    var pointer = theme;
    matches.forEach(function (match) {
      var parts = match.split(separator);
      var namespace = parts.shift();
      var className = parts.join(separator);

      if (!pointer[namespace]) {
        pointer[namespace] = {};
      }

      if (className) {
        pointer[namespace][className] = source[path];
      } else {
        pointer = pointer[namespace];
      }
    });
  });
  return theme;
}