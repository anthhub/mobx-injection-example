import React from 'react'
// import logo from './logo.svg';
import './App.css'

import { observer } from 'mobx-react'

import { Route, BrowserRouter, Switch, Link } from 'react-router-dom'
import Hooks from './pages/hooks/hooks'
import Klass from './pages/class/class'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/hooks" component={() => <Hooks />} />
            <Route path="/class" component={() => <Klass />}></Route>

            <Route path="/hooks/:id" component={() => <Hooks />} />
            <Route path="/class/:id" component={() => <Klass />}></Route>
            <Route path="/" component={() => <div style={{ padding: '20px' }}>首页</div>} />
          </Switch>

          <Link to="/">to app</Link>
          <Link to="/hooks">to hooks</Link>
          <Link to="/hooks/1">to hooks1</Link>
          <Link to="/hooks/2">to hooks2</Link>

          <div></div>
          <Link to="/class">to class1</Link>
          <Link to="/class/1">to class1</Link>
          <Link to="/class/2">to class2</Link>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default observer(App)
