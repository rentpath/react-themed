import * as React from 'react'

interface IOptions {
  pure?: boolean
}
export interface ThemedProps {
  theme: { [x: string]: string }
}

interface IThemeProviderProps {
  theme: ThemedProps['theme']
}

type composeTargetT = {}
type themesT = Array<any>
type composeOutputT = { [x: string]: string }

type Matching<InjectedProps, DecorationTargetProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P]
}

type Shared<
  InjectedProps,
  DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>
  > = {
      [P in Extract<keyof InjectedProps, keyof DecorationTargetProps>]?: InjectedProps[P] extends DecorationTargetProps[P] ? DecorationTargetProps[P] : never
  }

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type GetProps<C> = C extends React.ComponentType<infer P> ? P : never

type WrappedComponentClass<WrappedComponent, Props> = React.ComponentClass<JSX.LibraryManagedAttributes<WrappedComponent, Props>> & {
  WrappedComponent: WrappedComponent
}

type InferableComponentEnhancerWithProps<InjectedProps, INeedsProps> =
  <C extends React.ComponentType<GetProps<C>>>(component: C) =>
    WrappedComponentClass<C, Omit<GetProps<C>, keyof Shared<InjectedProps, GetProps<C>>> & INeedsProps>

type InferableComponentEnhancer<InjectedProps> = InferableComponentEnhancerWithProps<InjectedProps, {}>

interface Themed {
  (theme?: string[] | string | RegExp, options?: IOptions): InferableComponentEnhancer<ThemedProps>
}

export class ThemeProvider extends React.Component<IThemeProviderProps> {

}
export function compose(target?: composeTargetT, ...themes: themesT): composeOutputT
export const themed: Themed
export default themed
