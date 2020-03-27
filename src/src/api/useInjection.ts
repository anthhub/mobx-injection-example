/* eslint-disable react-hooks/exhaustive-deps */

import { Constructor, PlainObject } from '../core/meta'
import { useMemo } from 'react'

import { getInjector } from '../core/Injector'
import { useLocation } from 'react-router-dom'

const useInjection = <T>(InjectedStoreClass: Constructor<T>, args: (() => PlainObject) | PlainObject = {}) => {
  const { pathname = '' } = useLocation() || {}
  return useMemo(() => {
    let params = args

    if (typeof args === 'function') {
      params = args()
    }
    const injector = getInjector()
    return injector.get(InjectedStoreClass, params)
  }, [pathname])
}

export default useInjection
