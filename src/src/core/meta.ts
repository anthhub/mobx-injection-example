export const storeSymbol = Symbol('store')
export const storeScopeTypeSymbol = Symbol('storeScopeType')
export const storeOptionsSymbol = Symbol('storeOptionsSymbol')

export type Constructor<T> = new (...args: any[]) => T

export type PlainObject = {
  [propName: string]: any
}

export type Options = {
  persist?: boolean
  timeTravel?: boolean
}
