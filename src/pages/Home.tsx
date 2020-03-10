import React from 'react'
// import logo from './logo.svg';

import { observer } from 'mobx-react'
import { CounterStore } from '../store/counter'

import { CounterStore2 } from '../store/counter2'
import { useInjection } from 'mobx-injection'


function App() {
  const counterStore = useInjection(CounterStore)

  const counterStore2 = useInjection(CounterStore2)

  const { counter, increment, decrement } = counterStore

  return (
    <div className="App">
      home
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

export default observer(App)
