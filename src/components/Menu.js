import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {

  return (
    <div className="menu">
      <h1 className="nameofgame">QUIZ</h1>
      <div className="menuContainer">
        {/* <h1 className="quizmenu">QuizMenu</h1> */}
        <Link to={'/it'}>
          <h1 className="categories">PLAY: IT Quiz</h1>
        </Link> 
        {/* <h6>A Programming Quiz!</h6> */}
        <Link to={'/generalknowledge'}>
          <h1 className="categories">PLAY: General Knowledge</h1>
        </Link>
        {/* <h6>General Knowledge</h6> */}
        <Link to={'/japaneseanime'}>
          <h1 className="categories">PLAY: JapaneseAnime</h1>
        </Link>
        {/* <h6>Test your knowledge on Anime!</h6> */}
        <Link to={'/celebrities'}>
          <h1 className="categories">PLAY: Celebrities</h1>
        </Link>
        <h6>Tips: You can ask the audience for help once only, and use 50/50 only three times.</h6>
      </div>
    </div>
   
  )
}

export default Menu

