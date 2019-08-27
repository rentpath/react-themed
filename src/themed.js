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

const pluck = (theme, keys) => (
  keys.reduce((acc, key) => {
    acc[key] = theme[key]
    return acc
  }, {})
)

const match = (theme, regex) => {
  const acc = {}

  for (let i = 0, keys = Object.keys(theme); i < keys.length; i++) {
    const key = keys[i]

    // Test is much faster than .match
    if (regex.test(key)) {
      acc[key] = theme[key]
    }
  }

  return acc
}

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
        this.theme = undefined
        const themes = config.themes.slice()

        if (props[config.propName]) {
          themes.push(props[config.propName])
        }

        // If called as themed() or themed('*') just return the whole theme
        // without extra processing
        if (themes.length === 0 || (themes.length === 1 && themes[0] === '*')) {
          this.theme = shared
          return
        }

        for (let i = 0; i < themes.length; ++i) {
          const current = themes[i]

          if (Array.isArray(current)) {
            this.theme = this.compose(this.theme, pluck(shared, current))
          } else if (typeof current === 'string') {
            this.theme = this.compose(this.theme, current === '*' ? shared : shared[current])
          } else if (current instanceof RegExp) {
            this.theme = this.compose(this.theme, match(shared, current))
          } else if (typeof current === 'object') {
            this.theme = this.compose(this.theme, current)
          } else if (typeof current === 'function') {
            this.theme = current(this.theme, shared)
          }
        }
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
