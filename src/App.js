import React from 'react'
// import Main from './components/Main.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// console.log(process.env.REACT_APP_MY_API_KEY)
import PlayQuiz from './components/PlayQuiz.js'
// yarn add react-router-dom
// import Menu from './components/Menu.js'

function App() {
  
  
  
  
  
  
  
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/menu" component={Menu} /> */}
        <Route path="/play" component={PlayQuiz} />
      </Switch>
    </BrowserRouter>



  )
  
}

export default App
