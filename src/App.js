import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Game from './components/Game.js'
import Menu from './components/Menu.js'

function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Menu}/>
        <Route path="/game" component={Game} />
      </Switch>
    </BrowserRouter>
  )
  
}

export default App
