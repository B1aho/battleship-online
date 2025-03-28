import './App.css'
import { Board } from './features/GameBoard/Board';
import { Gameboard } from './game/Gameboard';

function App() {
  const game = new Gameboard();
  game.placeShip({ x: 0, y: 0 }, 9, "horizontal");
  game.placeShip({ x: 0, y: 1 }, 8, "horizontal");
  game.placeShip({ x: 3, y: 4 }, 8, "vertical");
  return (
    <>
      <Board gameboard={game} />
    </>
  )
}

export default App
