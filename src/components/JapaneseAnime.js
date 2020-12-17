import React from 'react'
import axios from 'axios'
// import Header from '../components/Header.js'
import { Link } from 'react-router-dom'
import FiftyFiftyBtn from '../components/FiftyFiftyBtn.js'
import Audience from '../components/Audience.js'

function JapaneseAnime() {

  const [quizzes, setQuizzes] = React.useState(null)
  
  React.useEffect(() => {

    const baseUrl = 'https://opentdb.com/api.php?amount=30&category=31' 
    const getData = async () => {
      try {
        const { data } = await axios.get(baseUrl)
        setQuizzes(data.results)
        
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    
  }, [])

  // console.log(quizzes)

  const [nextQuestion, setNextQuestion] = React.useState(0)
  const [right, setRight] = React.useState(0)
  const [wrong, setWrong] = React.useState(0)

  function handleClick(event) {
    
    // console.log(event.target.dataset.id)

    const checkWin = event.target.dataset.id

    if (checkWin === 'wrong') {
      console.log('its wrong')
      event.target.style.backgroundColor = 'red'
      setTimeout(normalMode, 200)
      setWrong(wrong + 1)
    } else if (checkWin === 'correct' ) {
      event.target.style.backgroundColor = 'green'
      setTimeout(normalMode, 200)
      setRight(right + 1)
    }

    function normalMode() {
      event.target.style.backgroundColor = ''
    }
    

    setNextQuestion(nextQuestion + 1)
    setFiftyFiftyActive(false)
  }

  const [fiftyFiftyActive, setFiftyFiftyActive] = React.useState(false)
  const [fiftyFiftyCount, setFiftyFiftyCount] = React.useState(3)
  // const [audienceActive, setAudienceActive]= React.useState(false)
  const [audienceCount, setAudienceCount] = React.useState(1)

  function randomNumberGenerator() {
    return Math.floor(Math.random() * 4)
  }

  const randomNumber = randomNumberGenerator()
  // const randomNumberForFifty = randomNumberGenerator() do this when I have time. // Random number gen for 5050 choices. Just do manually for now. 


  const RandomChoiceCombination = () => {
    if (randomNumber === 0) {
      return (
        <>
          <h3>Q{nextQuestion + 1}. {quizzes[nextQuestion].question}</h3>
          {fiftyFiftyActive ? null : <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> A. {quizzes[nextQuestion].incorrect_answers[0]} </h4>}
          <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> B. {quizzes[nextQuestion].incorrect_answers[1]} </h4>
          {fiftyFiftyActive ? null : <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> C. {quizzes[nextQuestion].incorrect_answers[2]} </h4>}
          <h4 id="animechoice" data-id="correct" onClick={handleClick} className="choice"> D. {quizzes[nextQuestion].correct_answer} </h4>
        </>
      )
    } else if (randomNumber === 1) {
      return (
        <>
          <h3>Q{nextQuestion + 1}. {quizzes[nextQuestion].question}</h3>
          {fiftyFiftyActive ? null : <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> A. {quizzes[nextQuestion].incorrect_answers[0]} </h4>}
          <h4 id="animechoice" data-id="correct" onClick={handleClick} className="choice"> B. {quizzes[nextQuestion].correct_answer} </h4>
          <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> C. {quizzes[nextQuestion].incorrect_answers[1]} </h4>
          {fiftyFiftyActive ? null : <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> D. {quizzes[nextQuestion].incorrect_answers[2]} </h4>}
        </>
      )
    } else if (randomNumber === 2) {
      return (
        <>
          <h3>Q{nextQuestion + 1}. {quizzes[nextQuestion].question}</h3>
          <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> A. {quizzes[nextQuestion].incorrect_answers[0]} </h4>
          {fiftyFiftyActive ? null : <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> B. {quizzes[nextQuestion].incorrect_answers[1]} </h4>}
          <h4 id="animechoice" data-id="correct" onClick={handleClick} className="choice"> C. {quizzes[nextQuestion].correct_answer} </h4>
          {fiftyFiftyActive ? null : <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> D. {quizzes[nextQuestion].incorrect_answers[2]} </h4>}
        </>
      ) 
    } else if (randomNumber === 3) {
      return (
        <>
          <h3>Q{nextQuestion + 1}. {quizzes[nextQuestion].question}</h3>
          <h4 id="animechoice" data-id="correct" onClick={handleClick} className="choice"> A. {quizzes[nextQuestion].correct_answer} </h4>
          <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> B. {quizzes[nextQuestion].incorrect_answers[0]} </h4>
          {fiftyFiftyActive ? null : <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> C. {quizzes[nextQuestion].incorrect_answers[1]} </h4>}
          {fiftyFiftyActive ? null : <h4 id="animechoice" data-id="wrong" onClick={handleClick} className="choice"> D. {quizzes[nextQuestion].incorrect_answers[2]} </h4>} 
        </>
      )
    }
  }

  

  console.log('render first one', fiftyFiftyActive)

  function handleClickFifty() {
    console.log('clicked')

    if (fiftyFiftyCount > 0) {
      setFiftyFiftyCount(fiftyFiftyCount - 1)
      setFiftyFiftyActive(!fiftyFiftyActive)
    } else if (fiftyFiftyCount < 0) {
      setFiftyFiftyActive(false)
    }
    // console.log(fiftyFiftyActive)
  }

  function askAudience(e) {
    if (audienceCount >= 1) {
      e.target.innerHTML = e.target.value
      setAudienceCount(audienceCount - 1)
      // setAudienceActive(true)
    } else {
      e.target.innerHTML = 'USED'
      return 
    }
  }



  return (
    <div className="mainContainer anime">
      
      <h1 className="right animescore">Right:<span>{right}</span></h1>
      <h1 className="wrong animescore">Wrong:<span>{wrong}</span></h1>
      
      <h1 className="header animeheader">Quiz: Anime</h1>
      <div id="helpButtonsContainer">
        {fiftyFiftyActive ? null : <FiftyFiftyBtn click={handleClickFifty}/>}
        {!quizzes ? null : <Audience value={quizzes[nextQuestion].correct_answer} click={askAudience} audienceCount={audienceCount}/>}
      </div>
      <div id="anime1">
        {!quizzes ? '...Loading' : 
          <>
            {RandomChoiceCombination()}
          </>

        }
      </div>
      <Link to={'/'}>
        <h4 className="back">Back to Menu</h4>
      </Link>
      
    </div>
  
  )
}

export default JapaneseAnime



