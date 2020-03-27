import React from 'react'
import 'reflect-metadata'
import { observer } from 'mobx-react'

import { GlobalStore } from '../../store/global'
import Child from './child'
import { LocalStore } from '../../store/local'
import { plusRouter, injection } from '../../src'

interface IP {
  name: string
}

@plusRouter
@observer
class Klass extends React.Component<IP> {
  @injection(GlobalStore, { name: 'Klass' })
  globalStore!: GlobalStore

  @injection(LocalStore, { name: 'Klass' })
  localStore!: LocalStore

  render() {
    const { username, operateCounter } = this.globalStore
    const {
      localStore: { counter },
    } = this
    return (
      <div className="App">
        Klass
        <header className="App-header">计数: {counter}</header>
        <header className="App-header">
          {username}总共操作了{operateCounter}次{' '}
        </header>
        <Child />
      </div>
    )
  }
}

export default Klass as any

export const Index = () => <Klass name="" />
