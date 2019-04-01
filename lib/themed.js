"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _shallowEqual = _interopRequireDefault(require("fbjs/lib/shallowEqual"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _const = require("./const");

var _compose = _interopRequireDefault(require("./compose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mergeProps = function mergeProps(ownProps, themeProps) {
  return _objectSpread({}, ownProps, themeProps);
};

var pluck = function pluck(theme, keys) {
  return keys.reduce(function (acc, key) {
    acc[key] = theme[key];
    return acc;
  }, {});
};

var match = function match(theme, regex) {
  var acc = {};

  for (var i = 0, keys = Object.keys(theme); i < keys.length; i++) {
    var key = keys[i]; // Test is much faster than .match

    if (regex.test(key)) {
      acc[key] = theme[key];
    }
  }

  return acc;
};

var create = function create(component, config) {
  var Themed =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Themed, _Component);

    function Themed() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Themed);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Themed)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _this.rebuild = undefined;
      return _this;
    }

    _createClass(Themed, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        // Theme is simple object key-value pair, no need to do more advanced object comparison
        if (!(0, _shallowEqual.default)(this.props[config.propName], nextProps[config.propName])) {
          this.rebuild = true;
          return true;
        }

        this.rebuild = false;
        return true;
      }
    }, {
      key: "compose",
      value: function compose(target, theme) {
        return theme ? config.compose(target || {}, theme) : theme;
      }
    }, {
      key: "buildTheme",
      value: function buildTheme(props, shared) {
        this.theme = undefined;
        var themes = config.themes.slice();

        if (props[config.propName]) {
          themes.push(props[config.propName]);
        }

        for (var i = 0; i < themes.length; ++i) {
          var current = themes[i];

          if (Array.isArray(current)) {
            this.theme = this.compose(this.theme, pluck(shared, current));
          } else if (typeof current === 'string') {
            this.theme = this.compose(this.theme, current === '*' ? shared : shared[current]);
          } else if (current instanceof RegExp) {
            this.theme = this.compose(this.theme, match(shared, current));
          } else if (_typeof(current) === 'object') {
            this.theme = this.compose(this.theme, current);
          } else if (typeof current === 'function') {
            this.theme = current(this.theme, shared);
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            childRef = _this$props.childRef,
            props = _objectWithoutProperties(_this$props, ["childRef"]);

        return _react.default.createElement(_const.ThemeConsumer, null, function (shared) {
          var _config$mergeProps;

          if (typeof _this2.rebuild === 'undefined' || _this2.rebuild) {
            _this2.buildTheme(props, shared);
          }

          return (0, _react.createElement)(component, config.mergeProps(props, (_config$mergeProps = {}, _defineProperty(_config$mergeProps, config.propName, _this2.theme), _defineProperty(_config$mergeProps, "ref", childRef), _config$mergeProps)));
        });
      }
    }]);

    return Themed;
  }(_react.Component);

  Themed[_const.CONFIG_KEY] = config;
  Themed.displayName = "Themed(".concat(component.displayName || component.name, ")");
  Themed.WrappedComponent = component;
  Themed.propTypes = _defineProperty({
    childRef: _propTypes.default.func
  }, config.propName, _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string, _propTypes.default.array, _propTypes.default.func]));
  return (0, _hoistNonReactStatics.default)(Themed, component);
};

var factory = function factory(defaults) {
  var themed = function themed(theme) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function (target) {
      var themes = [];

      var config = _objectSpread({}, defaults);

      var component = target;

      if (target[_const.CONFIG_KEY]) {
        config = _objectSpread({}, target[_const.CONFIG_KEY]);
        themes = _toConsumableArray(config.themes);
        component = target.WrappedComponent;
      }

      if (theme) {
        themes.push(theme);
      }

      Object.assign(config, options, {
        themes: themes
      });
      return create(component, config);
    };
  };

  return Object.assign(themed, {
    defaults: defaults,
    extend: function extend(config) {
      return factory(_objectSpread({}, defaults, config));
    }
  });
};

var _default = factory({
  compose: _compose.default,
  mergeProps: mergeProps,
  pure: false,
  propName: 'theme'
});

exports.default = _default;