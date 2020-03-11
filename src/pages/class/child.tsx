import React from 'react'

import { observer } from 'mobx-react'

import { LocalStore } from '../../store/local'
import { injectedComponent, injection } from 'mobx-injection'


@observer
@injectedComponent
class Klass extends React.Component {
  @injection(LocalStore, { name: 'Klass Child' })
  localStore!: LocalStore

  componentWillMount() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Klass Child -> componentWillMount -> componentWillMount')
  }

  componentDidMount() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Klass Child -> componentWillMount -> componentWillMount')
  }

  componentWillUnmount() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Klass Child -> componentWillUnmount -> componentWillUnmount')
  }

  render() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG:  Klass Child -> render -> render')
    const { increment } = this.localStore
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
