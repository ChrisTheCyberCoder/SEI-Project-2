import React from 'react'




function Audience(props) {

  // console.log(props.audienceCount)
  return <button value={props.value} className="audience animeAudience" onClick={props.click}>Ask the Audience</button>
}

export default Audience

