import React from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import Moneyboard from '../components/Moneyboard.js'

function Game() {

  const incorrectAnswers = document.querySelectorAll('[data-id="wrong"]')
  
  const answerChoice = React.useRef()
  const { state } = useLocation()
  const fifty = React.useRef()

  let playerAlreadyChose = false
  let quizTitle = ''
  let header = ''
  let textFormat = ''
  let borderChoice = ''
  let baseUrl = null 
  let positionOne = ''
  let positionTwo = ''
  let positionThree = ''
  let askAudienceLetter = ''

  let choiceOrderOne = randomNumberGeneratorForWrongOrder()
  let choiceOrderTwo = randomNumberGeneratorForWrongOrder()
  let choiceOrderThree = randomNumberGeneratorForWrongOrder()

  const [quizzes, setQuizzes] = React.useState(null)
  const [positionOneFiftyFifty, SetPositionOneFiftyFifty] = React.useState(false)
  const [positionTwoFiftyFifty, SetPositionTwoFiftyFifty] = React.useState(false)
  const [positionThreeFiftyFifty, SetPositionThreeFiftyFifty] = React.useState(false)
  const [nextQuestion, setNextQuestion] = React.useState(0)
  const [moneyboard, setMoneyboard] = React.useState(0) 
  const [displayGameOver, setDisplayGameOver] = React.useState(false)
  const [jackpotReached, setJackpotReached] = React.useState(false)
  const [takeTheMoney, setTakeTheMoney] = React.useState(false)
  const [fiftyFiftyActive, setFiftyFiftyActive] = React.useState(false)
  const [fiftyFiftyCount, setFiftyFiftyCount] = React.useState(1)
  const [audienceCount, setAudienceCount] = React.useState(1)
  const [randomNumber, setRandomNumber] = React.useState(null) /* sets positioning for the correct answer */ 
  const [incorrectChoiceOrderOne, setIncorrectChoiceOrderOne] = React.useState(null)
  const [incorrectChoiceOrderTwo, setIncorrectChoiceOrderTwo] = React.useState(null)
  const [incorrectChoiceOrderThree, setIncorrectChoiceOrderThree] = React.useState(null)
  

  const badData = {
    '&quot;': '',
    '&#039;': '',
    '&ldquo;': '',
    '&rdquo;': '',
    '&shy;': '',
    '&rsquo;': '', 
    '&oacute;': 'o',
  }

  if (state === 'IT') {
    baseUrl = 'https://opentdb.com/api.php?amount=50&category=18&type=multiple'
    quizTitle = 'IT'
    header = 'IT_header'
    textFormat = 'IT_text'
    borderChoice = 'ITchoice'
  } else if (state === 'generalKnowledge') {
    baseUrl = 'https://opentdb.com/api.php?amount=50&category=9&type=multiple'
    quizTitle = 'General Knowledge'
    header = 'general_header'
    textFormat = 'IT_text'
    borderChoice = 'ITchoice'
  } else if (state === 'anime') {
    baseUrl = 'https://opentdb.com/api.php?amount=30&category=31'
    quizTitle = 'Anime'
    header = 'anime_header'
    textFormat = 'anime_text'
    borderChoice = 'anime_choice'
  } else if (state === 'celebrities') {
    baseUrl = 'https://opentdb.com/api.php?amount=30&category=26&type=multiple'
    quizTitle = 'Celebrities'
    header = 'celeb_header'
    textFormat = 'celeb_text'
    borderChoice = 'celeb_choice'
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(baseUrl)
        // console.log(data.results)
        setQuizzes(data.results)
        setRandomNumber(Math.floor(Math.random() * 4))
        randomiseIncorrectChoices()
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  function showCorrectAnswer() {
    answerChoice.current.style.backgroundColor = 'green'
  }

  function gameOver() {
    setDisplayGameOver(true)
  }

  function normalMode() {
    answerChoice.current.style.backgroundColor = ''
    incorrectAnswers.forEach(item => {
      item.style.backgroundColor = ''
    })
    setMoneyboard(moneyboard + 1)
    setNextQuestion(nextQuestion + 1)
    setFiftyFiftyActive(false)
    SetPositionOneFiftyFifty(false)
    SetPositionTwoFiftyFifty(false)
    SetPositionThreeFiftyFifty(false)
    setRandomNumber(Math.floor(Math.random() * 4))
  }

  function handleClick(event) {

    if (playerAlreadyChose) return 
    
    const checkWin = event.target.dataset.id

    if (checkWin === 'wrong') {
      playerAlreadyChose = true
      event.target.style.backgroundColor = 'red'
      setTimeout(showCorrectAnswer, 1000)
      setTimeout(gameOver, 3000)
    } else if (checkWin === 'correct' ) {
      //if (playerAlreadyChose) return 
      playerAlreadyChose = true
      answerChoice.current.style.backgroundColor = 'green'
      
      if (moneyboard === 14) {
        setJackpotReached(true)
        setMoneyboard(moneyboard + 1)
        return
      }
      setTimeout(normalMode, 1000)
    }
  }

  function randomNumberGeneratorForWrongOrder() {
    const randomNo = Math.floor(Math.random() * 3)
    return randomNo
  }

  function randomiseIncorrectChoices() {

    while ((choiceOrderOne === choiceOrderTwo || choiceOrderOne === choiceOrderThree) || (choiceOrderTwo === choiceOrderOne || choiceOrderTwo === choiceOrderThree) || (choiceOrderThree === choiceOrderOne || choiceOrderThree === choiceOrderTwo)) {
      choiceOrderOne = randomNumberGeneratorForWrongOrder()
      choiceOrderTwo = randomNumberGeneratorForWrongOrder()
      choiceOrderThree = randomNumberGeneratorForWrongOrder()
    }

    setIncorrectChoiceOrderOne(choiceOrderOne)
    setIncorrectChoiceOrderTwo(choiceOrderTwo)
    setIncorrectChoiceOrderThree(choiceOrderThree)
  }

  function correctAnswerChoicePlacePosition(letter) {
    
    askAudienceLetter = letter

    return (
      <h4 
        id={`${borderChoice}`}
        data-id='correct'
        ref={answerChoice}
        onClick={handleClick}
        className='choice'>
        {letter} {quizzes[nextQuestion].correct_answer.replace(/&#039;|&quot;|&ldquo;|&rdquo;|&shy;|&rsquo;|&oacute;/g, function(matched){
          return badData[matched]
        })}</h4>
    )
  }
  
  if (randomNumber === 0) {
    positionOne = 'B.'
    positionTwo = 'C.'
    positionThree = 'D.'
  } else if (randomNumber === 1) {
    positionOne = 'A.'
    positionTwo = 'C.'
    positionThree = 'D.'
  } else if (randomNumber === 2) {
    positionOne = 'A.'
    positionTwo = 'B.'
    positionThree = 'D.'
  } else if (randomNumber === 3) {
    positionOne = 'A.'
    positionTwo = 'B.'
    positionThree = 'C.'
  }
  
  const randomChoiceCombination = () => {
    return (
      <>
        <h3>Q{nextQuestion + 1}. {quizzes[nextQuestion].question.replace(/&#039;|&quot;|&ldquo;|&rdquo;|&shy;|&rsquo;|&oacute;/g, function(matched){
          return badData[matched]
        })}</h3>

        { randomNumber === 0 ? correctAnswerChoicePlacePosition('A.') : null}

        { quizzes[nextQuestion].incorrect_answers[incorrectChoiceOrderOne] ? 
          <>
            {fiftyFiftyActive && positionOneFiftyFifty ? null : <h4 
              id={`${borderChoice}`} 
              data-id='wrong' 
              onClick={handleClick} 
              className='choice'> 
              {positionOne} {quizzes[nextQuestion].incorrect_answers[incorrectChoiceOrderOne].replace(/&#039;|&quot;|&ldquo;|&rdquo;|&shy;|&rsquo;|&oacute;/g, function(matched){
                return badData[matched]
              })}</h4>}
          </>
          : null }

        { randomNumber === 1 ? correctAnswerChoicePlacePosition('B.') : null}

        { quizzes[nextQuestion].incorrect_answers[incorrectChoiceOrderTwo] ?
          <>  
            {fiftyFiftyActive && positionTwoFiftyFifty ? null : <h4 
              id={`${borderChoice}`} 
              data-id='wrong' 
              onClick={handleClick} 
              className='choice'> 
              {positionTwo} {quizzes[nextQuestion].incorrect_answers[incorrectChoiceOrderTwo].replace(/&#039;|&quot;|&ldquo;|&rdquo;|&shy;|&rsquo;|&oacute;/g, function(matched){
                return badData[matched]
              })}</h4>}
          </>
          : null }

        { randomNumber === 2 ? correctAnswerChoicePlacePosition('C.') : null}

        { quizzes[nextQuestion].incorrect_answers[incorrectChoiceOrderThree] ? 
          <>
            {fiftyFiftyActive && positionThreeFiftyFifty ? null : <h4
              id={`${borderChoice}`}
              data-id='wrong'
              onClick={handleClick} 
              className='choice'> 
              {positionThree} {quizzes[nextQuestion].incorrect_answers[incorrectChoiceOrderThree].replace(/&#039;|&quot;|&ldquo;|&rdquo;|&shy;|&rsquo;|&oacute;/g, function(matched){
                return badData[matched]
              })}</h4>}
          </>
          : null }
         
        { randomNumber === 3 ? correctAnswerChoicePlacePosition('D.') : null}

      </>
    )
  }

  function handleClickFifty() {
    if (!quizzes[nextQuestion].incorrect_answers[1] || !quizzes[nextQuestion].incorrect_answers[2]) return
    if (!fiftyFiftyCount >= 1) return

    function randomGen() {
      return Math.floor(Math.random() * 3)
    }

    const randomNumberOne = randomGen()
    let randomNumberTwo = randomGen()

    while (randomNumberTwo === randomNumberOne) {
      randomNumberTwo = randomGen()
    }

    if (randomNumberOne === 0) {
      SetPositionOneFiftyFifty(true)
    } else if (randomNumberOne === 1) {
      SetPositionTwoFiftyFifty(true)
    } else if (randomNumberOne === 2) {
      SetPositionThreeFiftyFifty(true)
    }

    if (randomNumberTwo === 0) {
      SetPositionOneFiftyFifty(true)
    } else if (randomNumberTwo === 1) {
      SetPositionTwoFiftyFifty(true)
    } else if (randomNumberTwo === 2) {
      SetPositionThreeFiftyFifty(true)
    }

    setFiftyFiftyCount(fiftyFiftyCount - 1)
    setFiftyFiftyActive(true)
    
    fifty.current.style.textDecoration = 'line-through'
  } 

  function askAudience(e) {
    if (audienceCount >= 1) {
      e.target.innerHTML = askAudienceLetter
      setAudienceCount(audienceCount - 1)
      setTimeout(function () {
        e.target.innerText = 'Ask the Audience'
        e.target.style.textDecoration = 'line-through'
      }, 5000)
    } 
  }

  function checkPrizeMoney() {
    if (moneyboard < 5) {
      return <span className='won_nothing'>{'You have won nothing'}</span>
    } else if (moneyboard >= 5 && moneyboard < 10) {
      return <span className='won_1000'>{'You have won £1000'}</span>
    } else if (moneyboard >= 10 && moneyboard < 15) {
      return <span className='won_32000'>{'You have won £32,000'}</span>
    }
  }

  function moneyTaken() {
    switch (moneyboard) {
      case 0:
        return '£0'
      case 1:
        return '£100'
      case 2:
        return '£200'
      case 3:
        return '£300'
      case 4:
        return '£500'
      case 5:
        return '£1,000'
      case 6:
        return '£2,000'
      case 7:
        return '£4,000'
      case 8:
        return '£8,000'
      case 9:
        return '£16,000'
      case 10:
        return '£32,000'
      case 11:
        return '£64,000'
      case 12:
        return '£125,000'
      case 13:
        return '£250,000'
      case 14:
        return '£500,000'
      case 15:
        return '£1 MILLION'
    }
  }

  return (
    <div className='container'>
      {displayGameOver || jackpotReached || takeTheMoney ? null : <div className={'game_container ' + `${state}`}>
        <h1 className={'header ' + `${header}`}>Quiz: {quizTitle}</h1>
        <div id={`${textFormat}`}>
          {!quizzes ? '...Loading' : 
            <>
              {randomChoiceCombination()}
            </>
          }
        </div>
        <Link to={'/'}>
          <h4 className='back'>Back to Menu</h4>
        </Link>
      </div> }

      {!jackpotReached ? null : 
        <div className='jackpot'>
          <h1>Jackpot Reached</h1>
          <p className='million_message'>You have won £1 Million Pounds!</p>
          <Link to={'/'}>
            <h4 className='back'>Back to Menu</h4>
          </Link>
        </div>}

      {!takeTheMoney ? null : 
        <div className='takethemoney'>
          <h1>You have secured:</h1>
          <p>{moneyTaken()}</p>
          <Link to={'/'}>
            <h4 className='back'>Back to Menu</h4>
          </Link>
        </div>} 

      {displayGameOver ? null : <Moneyboard
        moneyboard={moneyboard}
        fiftyFiftyActive={fiftyFiftyActive}
        quizzes={quizzes}
        jackpotReached={jackpotReached}
        nextQuestion={nextQuestion}
        askAudience={askAudience}
        handleClickFifty={handleClickFifty}
        audienceCount={audienceCount}
        handleClickTakeTheMoney={() => moneyboard % 5 === 0 ? null : setTakeTheMoney(true)} 
        takeTheMoney={takeTheMoney}
        fifty={fifty}
        moneyTaken={moneyTaken()}
      />}

      {!displayGameOver ? null : 
        <div className='gameover'>
          <h1>Game Over</h1>
          <p>{checkPrizeMoney()}</p>
          <Link to={'/'}>
            <h4 className='back'>Back to Menu</h4>
          </Link>
        </div>}
    </div>
  )
}

export default Game

