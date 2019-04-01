import { createContext } from 'react';
export var ThemeContext = createContext();
var ThemeProvider = ThemeContext.Provider,
    ThemeConsumer = ThemeContext.Consumer;
export { ThemeProvider, ThemeConsumer };
export var CONTEXT_KEY = 'theme';
export var CONFIG_KEY = '__THEME_CONFIG__';