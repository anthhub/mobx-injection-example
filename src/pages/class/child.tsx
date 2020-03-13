import React from 'react'

import { observer } from 'mobx-react'

import { LocalStore } from '../../store/local'

import { injection, plusRouter } from 'mobx-injection'

@plusRouter
@observer
class Klass extends React.Component {
  @injection(LocalStore, { name: 'Klass Child' })
  localStore!: LocalStore

  render() {
    const {
      localStore: { increment },
    } = this
    return (
      <div className="App">
        child
        <header className="App-header">
          <button onClick={increment}>增加</button>
        </header>
      </div>
    )
  }
}

export default Klass
