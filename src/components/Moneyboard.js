import React from 'react'

function Moneyboard({ moneyboard, quizzes, nextQuestion, askAudience, handleClickFifty, handleClickTakeTheMoney, jackpotReached, takeTheMoney, fifty, moneyTaken }) {

  return (
    <div className={!jackpotReached && !takeTheMoney ? 'moneyboard' : 'moneyboard center_items_moneyboard'}>

      { jackpotReached || takeTheMoney ? null :
        <div id='helpButtonsContainer'>
          <h2 onClick={handleClickFifty} className='fiftyButton fifty' ref={fifty}>50:50</h2>
          {!quizzes ? null : <button value={quizzes[nextQuestion].correct_answer} className='audience' onClick={askAudience}>Ask the Audience</button>}
        </div>
      }
      
      { jackpotReached || takeTheMoney ? null : 
        <>
          {moneyboard > 0 ? <h1 className='takemoney_box' onClick={handleClickTakeTheMoney}>{moneyboard % 5 === 0 ? <span className='secured_money_off'>Secured <br />{moneyTaken}</span> : <><span>Take the Money?</span> <span className='secured_money_on'>{moneyTaken}</span></>}</h1> : <h1 className='takemoney_box'>{moneyTaken}</h1>}
        </>
      }

      {moneyboard === 15 || moneyboard >= 15 ? <div className='moneyboardgreen shake'>£1 MILLION</div> : <div>£1 MILLION</div>}
      {moneyboard === 14 || moneyboard >= 14 ? <div className='moneyboard_silver'>£500,000</div> : <div>£500,000</div>}
      {moneyboard === 13 || moneyboard >= 13 ? <div className='moneyboard_silver'>£250,000</div> : <div>£250,000</div>}
      {moneyboard === 12 || moneyboard >= 12 ? <div className='moneyboard_silver'>£125,000</div> : <div>£125,000</div>}
      {moneyboard === 11 || moneyboard >= 11 ? <div className='moneyboard_silver'>£64,000</div> : <div>£64,000</div>}
      {moneyboard === 10 || moneyboard >= 10 ? <div className='moneyboardyellow shake'>£32,000</div> : <div>£32,000</div>}
      {moneyboard === 9 || moneyboard >= 9 ? <div className='moneyboard_silver'>£16,000</div> : <div>£16,000</div>}
      {moneyboard === 8 || moneyboard >= 8 ? <div className='moneyboard_silver'>£8,000</div> : <div>£8,000</div>}
      {moneyboard === 7 || moneyboard >= 7 ? <div className='moneyboard_silver'>£4,000</div> : <div>£4,000</div>}
      {moneyboard === 6 || moneyboard >= 6 ? <div className='moneyboard_silver'>£2,000</div> : <div>£2,000</div>}
      {moneyboard === 5 || moneyboard >= 5 ? <div className='moneyboardyellow shake'>£1,000</div> : <div>£1,000</div>}
      {moneyboard === 4 || moneyboard >= 4 ? <div className='moneyboard_silver'>£500</div> : <div>£500</div>}
      {moneyboard === 3 || moneyboard >= 3 ? <div className='moneyboard_silver'>£300</div> : <div>£300</div>}
      {moneyboard === 2 || moneyboard >= 2 ? <div className='moneyboard_silver'>£200</div> : <div>£200</div>}
      {moneyboard === 1 || moneyboard >= 1 ? <div className='moneyboard_silver'>£100</div> : <div>£100</div>}
    </div>
  )
}

export default Moneyboard