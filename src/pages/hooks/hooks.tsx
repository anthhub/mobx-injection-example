import React, { useEffect } from 'react'

import { observer } from 'mobx-react'
import { GlobalStore } from '../../store/global'

import { LocalStore } from '../../store/local'

import Child from './child'
import { useInjection } from '../../lib'
import { useParams, useHistory } from 'react-router-dom'
import { page } from '../../lib/api/page'

function Hooks() {
  // const history = useHistory()
  // console.log('%c%s', 'color: #259b24', 'ANTH LOG: Hooks -> history', history)
  // const { id = '' } = useParams()
  // console.log('%c%s', 'color: #259b24', 'ANTH LOG: Hooks -> id', id)
  // const { username, operateCounter } = useInjection(GlobalStore, { name: 'Hooks' })

  debugger
  const { counter } = useInjection(LocalStore, { name: 'Hooks' })

  console.log('%c%s', 'color: #259b24', 'ANTH LOG: Hooks -> render')

  useEffect(() => {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Hooks -> mount')

    return () => {
      console.log('%c%s', 'color: #259b24', 'ANTH LOG: Hooks -> unmount')
    }
  })

  return (
    <div className="App">
      Hooks
      <header className="App-header">计数: {counter}</header>
      <header className="App-header">{/* {username}总共操作了{operateCounter}次 */}</header>
      <Child />
    </div>
  )
}

export default page(observer(Hooks))
