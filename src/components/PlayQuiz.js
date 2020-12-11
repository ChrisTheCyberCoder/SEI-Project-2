import React from 'react'
import axios from 'axios'
import Header from '../components/Header.js'

function PlayQuiz() {

  const [quizzes, setQuizzes] = React.useState(null)
  
  React.useEffect(() => {

    const baseUrl = 'https://opentdb.com/api.php?amount=50&category=18&type=multiple'
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
      // event.target.style.backgroundColor = 'pink'
      setWrong(wrong + 1)
    } else if (checkWin === 'correct' ) {
      // event.target.style.backgroundColor = 'green'
      // setNextQuestion(nextQuestion + 1)
      setRight(right + 1)
    }

    setNextQuestion(nextQuestion + 1)
  }

  // const [randomNumber, setRandomNumber] = React.useState(0)

  // function randomNumberGenerator() {
  //   const randomNumber = Math.floor(Math.random() * 4)
  //   return randomNumber
  // }

  // setRandomNumber(randomNumberGenerator())

  // console.log(randomNumber)

  function randomNumberGenerator() {
    return Math.floor(Math.random() * 4)
  }

  const randomNumber = randomNumberGenerator()


  const RandomChoiceCombination = () => {
    if (randomNumber === 0) {
      return (
        <>
          <h3>Q{nextQuestion}. {quizzes[nextQuestion].question}</h3>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> A. {quizzes[nextQuestion].incorrect_answers[0]} </h4>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> B. {quizzes[nextQuestion].incorrect_answers[1]} </h4>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> C. {quizzes[nextQuestion].incorrect_answers[2]} </h4>
          <h4 data-id="correct" onClick={handleClick} className="choice"> D. {quizzes[nextQuestion].correct_answer} </h4>
        </>
      )
    } else if (randomNumber === 1) {
      return (
        <>
          <h3>Q{nextQuestion}. {quizzes[nextQuestion].question}</h3>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> A. {quizzes[nextQuestion].incorrect_answers[0]} </h4>
          <h4 data-id="correct" onClick={handleClick} className="choice"> B. {quizzes[nextQuestion].correct_answer} </h4>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> C. {quizzes[nextQuestion].incorrect_answers[1]} </h4>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> D. {quizzes[nextQuestion].incorrect_answers[2]} </h4>
        </>
      )
    } else if (randomNumber === 2) {
      return (
        <>
          <h3>Q{nextQuestion}. {quizzes[nextQuestion].question}</h3>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> A. {quizzes[nextQuestion].incorrect_answers[0]} </h4>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> B. {quizzes[nextQuestion].incorrect_answers[1]} </h4>
          <h4 data-id="correct" onClick={handleClick} className="choice"> C. {quizzes[nextQuestion].correct_answer} </h4>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> D. {quizzes[nextQuestion].incorrect_answers[2]} </h4>
        </>
      ) 
    } else if (randomNumber === 3) {
      return (
        <>
          <h3>Q{nextQuestion}. {quizzes[nextQuestion].question}</h3>
          <h4 data-id="correct" onClick={handleClick} className="choice"> A. {quizzes[nextQuestion].correct_answer} </h4>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> B. {quizzes[nextQuestion].incorrect_answers[0]} </h4>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> C. {quizzes[nextQuestion].incorrect_answers[1]} </h4>
          <h4 data-id="wrong" onClick={handleClick} className="choice"> D. {quizzes[nextQuestion].incorrect_answers[2]} </h4> 
        </>
      )
    }
  }

  return (
    <div className="mainContainer">
      
      <h1 className="right">Right:<span>{right}</span></h1>
      <h1 className="wrong">Wrong:<span>{wrong}</span></h1>
      <Header />
      <div>
        {!quizzes ? '...Loading' : 
          <>
            {RandomChoiceCombination()}
          </>

        }
      </div>
      
    </div>
  
  )
}

export default PlayQuiz



