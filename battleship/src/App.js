import './App.css';
import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import ShipSelection from './ShipSelection';
function App() {

  const [selectedShip, selectShip] = useState([]);
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
  console.log(selectedShip);
  
  return(
  <div className="App">
    <h1 class="title">Battleship</h1>
  <GameBoard className="gameboard" length="9" selectedShip={selectedShip} direction={direction} primary={true}/>
  <GameBoard className="gameboard" length="9" primary={false}/>
  <ShipSelection className="ship-selection" onClick={onSelectShip}/>
  </div>
  )
}

export default App;
