import React from 'react'

import { observer } from 'mobx-react'
import { GlobalStore } from '../../store/global'

import { LocalStore } from '../../store/local'

import Child from './child'
import { useInjection } from '../../src'


function Hooks() {
  const { username, operateCounter } = useInjection(GlobalStore, { name: 'Hooks' })

  const { counter } = useInjection(LocalStore, { name: 'Hooks' })

  return (
    <div className="App">
      Hooks
      <header className="App-header">计数: {counter}</header>
      <header className="App-header">
        {username}总共操作了{operateCounter}次{' '}
      </header>
      <Child />
    </div>
  )
}

export default observer(Hooks)
