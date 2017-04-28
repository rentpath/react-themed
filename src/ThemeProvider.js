import { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import composeTheme from './composeTheme'
import { CONTEXT_KEY } from './const'

export default class ThemeProvider extends PureComponent {
  static contextTypes = {
    [CONTEXT_KEY]: PropTypes.object,
  }

  static propTypes = {
    theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    compose: PropTypes.bool,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    compose: true,
  }

  static childContextTypes = {
    [CONTEXT_KEY]: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.buildTheme(props, context)
  }

  componentWillUpdate(props, state, context) {
    if (this.context[CONTEXT_KEY] !== context[CONTEXT_KEY] || this.props.theme !== props.theme) {
      this.buildTheme(props, context)
    }
  }

  buildTheme(props, context) {
    const { theme, compose } = props
    const { [CONTEXT_KEY]: parentTheme } = context

    if (typeof theme === 'function') {
      this.theme = theme(parentTheme)
    } else if (parentTheme && compose) {
      this.theme = composeTheme(parentTheme, theme)
    } else {
      this.theme = theme
    }
  }

  getChildContext() {
    return { [CONTEXT_KEY]: this.theme }
  }

  render() {
    return Children.only(this.props.children)
  }
}
