import React from 'react'
// import logo from './logo.svg';
import './App.css'

import { observer } from 'mobx-react'

import { Route, BrowserRouter, Switch, Link } from 'react-router-dom'
import Hooks from './pages/hooks/hooks'
import Klass from './pages/class/class'
import { InjectedRouter } from 'mobx-injection'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <InjectedRouter>
            <Switch>
              <Route
                path="/hooks/:id"
                component={() => {
                  return <Hooks />
                }}
              />
              <Route path="/class/:id" component={() => <Klass />} />

              <Route exact path="/hooks" component={() => <Hooks />} />
              <Route exact path="/class" component={() => <Klass />} />

              <Route
                path="/"
                component={() => {
                  return <div style={{ padding: '20px' }}>首页</div>
                }}
              />
            </Switch>

            <Link to="/">to app</Link>
            <Link to="/hooks">to hooks</Link>
            <Link to="/hooks/1">to hooks1</Link>
            <Link to="/hooks/2">to hooks2</Link>

            <div></div>
            <Link to="/class">to class</Link>
            <Link to="/class/1">to class1</Link>
            <Link to="/class/2">to class2</Link>
          </InjectedRouter>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default observer(App)
