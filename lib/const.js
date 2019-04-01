"use strict";

exports.__esModule = true;
exports.CONFIG_KEY = exports.CONTEXT_KEY = exports.ThemeConsumer = exports.ThemeProvider = exports.ThemeContext = void 0;

var _react = require("react");

var ThemeContext = (0, _react.createContext)();
exports.ThemeContext = ThemeContext;
var ThemeProvider = ThemeContext.Provider,
    ThemeConsumer = ThemeContext.Consumer;
exports.ThemeConsumer = ThemeConsumer;
exports.ThemeProvider = ThemeProvider;
var CONTEXT_KEY = 'theme';
exports.CONTEXT_KEY = CONTEXT_KEY;
var CONFIG_KEY = '__THEME_CONFIG__';
exports.CONFIG_KEY = CONFIG_KEY;