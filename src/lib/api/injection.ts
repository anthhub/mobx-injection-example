import 'reflect-metadata'

import { Constructor, storeScopeTypeSymbol, PlainObject } from '../core/meta'
import { Scope, getInjector } from '../core/Injector'
import { withRouter } from 'react-router-dom'

const injector = getInjector()

export default <T>(InjectedStoreClass?: Constructor<T>, args: ((props: any) => PlainObject) | PlainObject = {}): any => (target: any, property: string) => {
  const selfScope = target[storeScopeTypeSymbol]
  console.log('%c%s', 'color: #9b2495', 'ANTH LOG: target', target)
  target = withRouter(target)
  console.log('%c%s', 'color: #9b2495', 'ANTH LOG: target', target)

  if (selfScope && selfScope === 'session') {
    throw Error(`session store forbid to be inject into session store!`)
  }

  if (!InjectedStoreClass) {
    InjectedStoreClass = Reflect.getMetadata('design:type', target, property)
  }

  // tslint:disable-next-line: no-unnecessary-type-assertion
  const clazz = InjectedStoreClass as any

  if (target instanceof clazz) {
    throw Error(`injection decorator can't be use to self!`)
  }

  const scope: Scope = (InjectedStoreClass as any)[storeScopeTypeSymbol]

  return {
    enumerable: true,
    configurable: true,
    get(this: any) {
      let params = args

      if (typeof args === 'function') {
        params = args(this)
      }

      return new Proxy(
        {},
        {
          get(target, key) {
            console.log('%c%s', 'color: #244a9b', 'ANTH LOG: get -> key', key)
            const store = injector.get(clazz, scope, params) as any
            console.log('%c%s', 'color: #244a9b', 'ANTH LOG: get -> store', store)
            return store[key]
          },
        }
      )
    },
    // @formatter:off
    // tslint:disable-next-line
    set() {},
    // @formatter:on
  }
}
