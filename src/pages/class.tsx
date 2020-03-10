import React from 'react'
// import logo from './logo.svg';

import { observer } from 'mobx-react'

import { CounterStore } from '../store/counter'

import { CounterStore2 } from '../store/counter2'
import { injectedComponent, injection } from 'mobx-injection'

@observer
@injectedComponent
class Klass extends React.Component {
  @injection(CounterStore)
  counterStore!: CounterStore

  @injection(CounterStore2)
  counterStore2!: CounterStore2

  componentWillMount() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Class -> componentWillMount -> componentWillMount')
  }

  componentWillUnmount() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Class -> componentWillUnmount -> componentWillUnmount')
  }

  render() {
    const { counter, increment, decrement } = this.counterStore || {}

    const { counterStore2 } = this

    return (
      <div className="App">
        index
        <header className="App-header">
          {counter}
          <button onClick={increment}>增加</button>
          <button onClick={decrement}>减少</button>
        </header>
        <header className="App-header">
          {counterStore2.counter}
          <button onClick={counterStore2.increment}>增加</button>
          <button onClick={counterStore2.decrement}>减少</button>
        </header>
      </div>
    )
  }
}

export default Klass
