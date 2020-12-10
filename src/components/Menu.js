import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {

  return (
    <div className="mainContainer">
      <div className="playDiv"> 
    Quiz Choice    
      </div>
      <Link to={'/play'}>
        <h4>PLAY</h4>
      </Link> 
    </div>
   
    
  )
}

export default Menu