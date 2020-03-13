import React from 'react'

import { observer } from 'mobx-react'

import { LocalStore } from '../../store/local'
import { useInjection } from 'mobx-injection'

function Child() {
  const { increment } = useInjection(LocalStore, { name: 'Child' })

  return (
    <div className="App">
      child
      <header className="App-header">
        <button onClick={increment}>增加</button>
      </header>
    </div>
  )
}

export default observer(Child)
