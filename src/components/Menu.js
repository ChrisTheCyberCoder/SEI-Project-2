import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {

  return (
    <div className="menu">
      <h1 className="nameofgame">QUIZ</h1>
      <div className="menuContainer">
        
        <Link to={{ pathname: '/game', state: 'IT' }}>
          <h1 className="categories">PLAY: Information Technology</h1>
        </Link> 
       
        <Link to={{ pathname: '/game', state: 'generalKnowledge' }}>
          <h1 className="categories">PLAY: General Knowledge</h1>
        </Link>
        
        <Link to={{ pathname: '/game', state: 'anime' }}>
          <h1 className="categories">PLAY: Anime</h1>
        </Link>
        
        <Link to={{ pathname: '/game', state: 'celebrities' }}>
          <h1 className="categories">PLAY: Celebrities</h1>
        </Link>

        <h6>Tips: Life-lines can only be used once each. </h6>
      </div>
    </div>
   
  )
}

export default Menu

