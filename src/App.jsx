import { useState } from 'react'
import React from 'react'
import Dice from './components/Dice.jsx'
import Header from './components/Header.jsx'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import Confetti from 'react-confetti'


function App() {

  const [dice, changeDice] = useState(randomId());
  const [tenzies,changeTenzies]=useState(false);

  useEffect(
   ()=> {
    const allHeld=dice.every(die=>die.isHeld);
    const sameValue=dice[0].value;
    const allSameValue=dice.every(die=>die.value===sameValue);
    if(allHeld && allSameValue){
      changeTenzies(true)
    }
    
    },[dice]
  )
  //whenever the die's value will change this useEffect will be called.

  // we used changeDice to change the array set in dice.

  function rollDice() {
    if(!tenzies){
    changeDice(oldDie=>oldDie.map(
      die=>{
        return die.isHeld?die:{
        value:Math.ceil(Math.random() * 6),//we want random value between 0 and 6 so 6 is multiplied.
        isHeld:false,
        id:nanoid()
        }
      }
    
    )
    
    )}
    else{
      changeTenzies(false);
      changeDice(randomId())

    }



    // changeDice(randomId());

  }

  function randomId() {

    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value:Math.ceil(Math.random() * 6),
        isHeld:false,
        id:nanoid()

      } 
      );
    }
    return arr;

  }
  function holdDice(id){
    changeDice(oldDie=>oldDie.map(
      die=>{
        return die.id===id?
        {...die,isHeld: ! die.isHeld}:
        die
      }
    ))
  }

  const elements = dice.map(die => <Dice value={die.value} isHeld={die.isHeld} key={die.id} holdDice={()=>holdDice(die.id)}/>)


  return (
    
    <div>
      <div className="main-container">
       { tenzies && <Confetti/>}
        <Header />
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {elements}
        </div>
        <button className='btn' onClick={rollDice}> {tenzies ? "play again": "Roll"} </button>
      </div>
    </div>

  )

}

export default App
