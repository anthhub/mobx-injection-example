import React from 'react'

import { observer } from 'mobx-react'

import { LocalStore } from '../../store/local'
import { useInjection } from '../../src'
import { GlobalStore } from '../../store/global'

function Child() {
  const { increment } = useInjection(LocalStore, { name: 'Child' })
  const { backStep, forwardStep } = useInjection(GlobalStore, { name: 'Child' })

  return (
    <div className="App">
      child
      <header className="App-header">
        <button onClick={increment}>增加</button>
        <button onClick={backStep}>返回</button>
        <button onClick={forwardStep}>前进</button>
      </header>
    </div>
  )
}

export default observer(Child)
