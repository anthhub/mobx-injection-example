import React, { useEffect } from 'react'

import { observer } from 'mobx-react'

import { LocalStore } from '../../store/local'
import { useInjection } from '../../lib'
import { useParams } from 'react-router-dom'

function Child() {
  // const { id = '' } = useParams()
  // console.log('%c%s', 'color: #259b24', 'ANTH LOG: Child -> id', id)

  const { increment } = useInjection(LocalStore, { name: 'Child' })

  console.log('%c%s', 'color: #259b24', 'ANTH LOG: Child -> render')

  useEffect(() => {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Child -> mount')

    return () => {
      console.log('%c%s', 'color: #259b24', 'ANTH LOG: Child -> unmount')
    }
  })

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
