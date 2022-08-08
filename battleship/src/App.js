import './App.css';
import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import ShipSelection from './ShipSelection';
import PlayButton from './PlayButton';
function App() {

  const [selectedShip, selectShip] = useState();
  const [direction, changeDirection] = useState("row");
  useEffect(()=>{
    document.addEventListener('keydown', handleChangeDirection, true);
  })
  const handleChangeDirection = (e) => {
    if(e.key === 'r'){
      if(direction == "row"){
        changeDirection("col")
      }else{
        changeDirection("row");
      }
      console.log(direction)
    }
  }
  const onSelectShip = (ship) =>{
    selectShip(ship);
    console.log(ship);
  }
//Resets the selected ship when a ship is placed down
  const handleOnClick = (placedShip, shipId, clicked) => { 
    if(clicked){
      selectShip();
    }
  }
  //Sets the game mode to playing
  const play = () => {
    console.log("Play");
  }
  
  return(
  <div className="App">
    <h1 class="title">Battleship</h1>
    <div class="game-container">
      <GameBoard className="gameboard" length="9" selectedShip={selectedShip} direction={direction} primary={true} onClick={handleOnClick}/>
      <div class="left-section">
        <GameBoard className="gameboard" length="9" primary={false}/>
      </div>
    </div>

  <ShipSelection className="ship-selection" selectedShip={selectedShip} onClick={onSelectShip}/> 
  </div>
  )
}

export default App;
