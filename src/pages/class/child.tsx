import React from 'react'
import 'reflect-metadata'
import { observer } from 'mobx-react'

import { LocalStore } from '../../store/local'
import { injection, plusRouter } from '../../src'

function logType(target: any, key: string) {
  var t = Reflect.getMetadata('design:type', target, key)
  console.log('%c%s', 'color: #259b24', 'ANTH LOG: logType -> t', t)
  // console.log(`${key} type: ${t.name}`)
}

@plusRouter
@observer
class Klass extends React.Component {
  @injection(LocalStore, { name: 'Klass Child' })
  @logType
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
