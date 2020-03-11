/* eslint-disable react-hooks/exhaustive-deps */

import { Constructor, PlainObject, storeScopeTypeSymbol } from '../core/meta'
import { useRef, useMemo, useEffect } from 'react'

import { Scope, storeCreaterMap, getInjector } from '../core/Injector'

const injector = getInjector()

export default <T>(InjectedStoreClass: Constructor<T>, deps: any[] = [], args: (() => PlainObject) | PlainObject = {}) => {
  console.log('%c%s', 'color: #259b24', 'ANTH LOG: deps', deps)
  const selfRef = useRef<any>({ timestamp: Date.now() })

  const scope: Scope = (InjectedStoreClass as any)[storeScopeTypeSymbol]

  if (!storeCreaterMap.get(InjectedStoreClass)) {
    storeCreaterMap.set(InjectedStoreClass, selfRef.current)
  }

  const store = useMemo(() => {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: store -> useMemo')
    let params = args

    if (typeof args === 'function') {
      params = args()
    }
    return injector.get(InjectedStoreClass, scope, params)
  }, deps)

  useEffect(
    () => () => {
      if (storeCreaterMap.get(InjectedStoreClass) === selfRef.current && scope === 'session') {
        console.log('%c%s', 'color: #259b24', 'ANTH LOG: useEffect selfRef.current', selfRef.current)
        storeCreaterMap.delete(InjectedStoreClass)
        selfRef.current = null
      }
    },
    deps
  )

  return store
}
