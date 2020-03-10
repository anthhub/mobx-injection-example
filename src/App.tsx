import React from 'react'
// import logo from './logo.svg';
import './App.css'

import { observer } from 'mobx-react'

import { Route, BrowserRouter, Switch, Link } from 'react-router-dom'
import Home from './pages/Home'
import Klass from './pages/class'

function App() {
  // const {
  //   counterStore: { counter, increment, decrement },
  // } = useStore()

  // const counterStore = useInject(CounterStore, 'counterStore')

  // const { counter, increment, decrement } = counterStore

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={() => <Home />} />
            {/* <Route path="/index" component={() => <Home />} /> */}
            <Route path="/class" component={() => <Klass />} >
            </Route >
            <Route path="/" component={() => <div style={{ padding: '20px' }}>首页</div>} />
          </Switch>

          <Link to="/">to app</Link>
          <Link to="/home">to home</Link>

          <Link to="/class">to class</Link>
        </BrowserRouter>
        {/* {counter}
        <button onClick={increment}>增加</button>
        <button onClick={decrement}>减少</button> */}
      </header>
    </div>
  )
}

export default observer(App)
