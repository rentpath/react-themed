import React, { createElement, Component } from 'react'
import shallowEqual from 'fbjs/lib/shallowEqual'
import PropTypes from 'prop-types'
import hoist from 'hoist-non-react-statics'
import { ThemeConsumer, CONFIG_KEY } from './const'
import compose from './compose'

const mergeProps = (
  ownProps,
  themeProps,
) => ({
  ...ownProps,
  ...themeProps,
})

const create = (component, config) => {
  class Themed extends Component {
    static [CONFIG_KEY] = config

    static displayName = `Themed(${component.displayName || component.name})`

    static WrappedComponent = component

    static propTypes = {
      childRef: PropTypes.func,
      [config.propName]: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.array,
        PropTypes.func,
      ]),
    }

    build = true

    shouldComponentUpdate(nextProps) {
      const { [config.propName]: themePropPrev, ...restPropPrev } = this.props
      const { [config.propName]: themePropNext, ...restPropNext } = nextProps

      // We rebuild theme if theme prop is different
      this.build = !shallowEqual(themePropPrev, themePropNext)

      // We also rebuild if other props have changed, but it's quicker to shallow
      // compare non-theme prop stuff
      return (this.build || !shallowEqual(restPropPrev, restPropNext))
    }

    compose(target, theme) {
      return theme ? config.compose(target || {}, theme) : theme
    }

    buildTheme(props, shared = {}) {
      if (this.build) {
        this.theme = shared
      }
    }

    render() {
      const {
        childRef,
        ...props
      } = this.props

      return (
        <ThemeConsumer>
          {shared => {
            this.buildTheme(props, shared)

            return createElement(component, config.mergeProps(props, {
              [config.propName]: this.theme,
              ref: childRef,
            }))
          }}
        </ThemeConsumer>
      )
    }
  }

  return hoist(
    Themed,
    component,
  )
}

const factory = defaults => {
  const themed = (theme, options = {}) => target => {
    let themes = []
    let config = { ...defaults }
    let component = target

    if (target[CONFIG_KEY]) {
      config = { ...target[CONFIG_KEY] }
      themes = [...config.themes]
      component = target.WrappedComponent
    }

    if (theme) {
      themes.push(theme)
    }

    Object.assign(config, options, {
      themes,
    })

    return create(
      component,
      config,
    )
  }

  return Object.assign(themed, {
    defaults,
    extend: config => (
      factory({
        ...defaults,
        ...config,
      })
    ),
  })
}

export default factory({
  compose,
  mergeProps,
  pure: false,
  propName: 'theme',
})
