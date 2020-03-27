import React from 'react'
import { Route, useLocation } from 'react-router-dom'
import { getInjector } from '../core/Injector'

export let prePath = ''

interface IP {
  children?: any
}

const InjectedRouter: React.FC<IP> = props => {
  const location = useLocation() || {}

  const { pathname = '' } = location

  if (pathname !== prePath) {
    const injector = getInjector()
    injector.clearSession()
    prePath = pathname
  }

  return <Route>{props.children}</Route>
}

export default InjectedRouter
