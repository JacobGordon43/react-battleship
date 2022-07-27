import './App.css';
import GameBoard from './GameBoard';
import ShipSelection from './ShipSelection';
function App() {
  return(
  <div className="App">
    <h1>Battleship</h1>
  <GameBoard className="gameboard" length="9"/>
  <ShipSelection className="ship-selection"/>
  </div>
  )
}

export default App;
