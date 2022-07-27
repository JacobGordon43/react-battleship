import './App.css';
import React, { useState } from 'react';
import GameBoard from './GameBoard';
import ShipSelection from './ShipSelection';
function App() {

  const [selectedShip, selectShip] = useState([])
  const onSelectShip = (ship) =>{
    selectShip(ship);
    console.log(ship);
  }
  console.log(selectedShip);
  
  return(
  <div className="App">
    <h1>Battleship</h1>
  <GameBoard className="gameboard" length="9" selectedShip={selectedShip}/>
  <ShipSelection className="ship-selection" onClick={onSelectShip}/>
  </div>
  )
}

export default App;
