import 'reflect-metadata'

import { Constructor, storeScopeTypeSymbol, PlainObject } from '../core/meta'
import { Scope, getInjector } from '../core/Injector'

export default <T>(InjectedStoreClass?: Constructor<T>, args: ((props: any) => PlainObject) | PlainObject = {}): any => (target: any, property: string) => {
  if (!InjectedStoreClass) {
    InjectedStoreClass = Reflect.getMetadata('design:type', target, property)
    if (!InjectedStoreClass) {
      throw new SyntaxError(
        'You must pass a Class for injection while you are not using typescript!' + 'Or you may need to add "emitDecoratorMetadata: true" configuration to your tsconfig.json'
      )
    }
  }

  const injectedStores = Reflect.getMetadata('injectedStores', target, property) || []
  injectedStores.push(InjectedStoreClass)
  Reflect.defineMetadata('injectedStores', injectedStores, target, property)

  const injectedStores1 = Reflect.getMetadata('injectedStores', target, property) || []

  // tslint:disable-next-line: no-unnecessary-type-assertion
  const clazz = InjectedStoreClass as any

  if (target instanceof clazz) {
    throw Error(`injection decorator can't be use to self!`)
  }

  return {
    enumerable: true,
    configurable: true,
    get(this: any) {
      let params = args

      if (typeof args === 'function') {
        params = (args as any).call(this, this)
      }
      const injector = getInjector()

      return injector.get(clazz, params)
    },
    // @formatter:off
    // tslint:disable-next-line
    set() {},
    // @formatter:on
  }
}
