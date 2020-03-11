import React from 'react'
import { useHistory } from 'react-router-dom'
import { getInjector } from '../core/Injector'

const injector = getInjector()

let prePath = ''

export const page = (Comp: any): any => {
  return (...props: any[]): any => {
    const {
      location: { pathname = '' },
    } = useHistory() || {}

    debugger
    if (prePath !== pathname) {
      injector.clearSession()
      prePath = pathname
    }

    return <Comp {...props} />
  }
}
