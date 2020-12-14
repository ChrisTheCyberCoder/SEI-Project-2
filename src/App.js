import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import IT from './components/IT.js'
import Menu from './components/Menu.js'
import GeneralKnowledge from './components/GeneralKnowledge.js'
import JapaneseAnime from './components/JapaneseAnime.js'
import Celebrities from './components/Celebrities.js'

function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Menu}/>
        <Route path="/it" component={IT} />
        <Route path="/generalknowledge" component={GeneralKnowledge} />
        <Route path="/japaneseanime" component={JapaneseAnime} />
        <Route path="/celebrities" component={Celebrities} />
      </Switch>
    </BrowserRouter>
  )
  
}

export default App
