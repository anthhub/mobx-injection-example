import React from 'react'

import { observer } from 'mobx-react'

import { GlobalStore } from '../../store/global'
import Child from './child'
import { LocalStore } from '../../store/local'
import { injection } from '../../lib'
import { page } from '../../lib/api/page'
import { withRouter } from 'react-router-dom'
import { plusRouter } from '../../lib/api/plusRouter'

@plusRouter
@page
@observer
class Klass extends React.Component {
  // @injection(GlobalStore, { name: 'Klass' })
  // globalStore!: GlobalStore

  @injection(LocalStore, { name: 'Klass' })
  localStore!: LocalStore

  componentWillMount() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Klass -> componentWillMount -> componentWillMount')
  }

  componentDidMount() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Klass  -> componentWillMount -> componentWillMount')
  }

  componentWillUnmount() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Klass -> componentWillUnmount -> componentWillUnmount')
  }

  render() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Klass -> render -> render')
    // const { username, operateCounter } = this.globalStore
    const {
      localStore: { counter },
    } = this
    return (
      <div className="App">
        Klass
        <header className="App-header">计数: {counter}</header>
        <header className="App-header">{/* {username}总共操作了{operateCounter}次 */}</header>
        <Child />
      </div>
    )
  }
}

export default Klass as any
