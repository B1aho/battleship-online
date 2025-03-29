import './App.css'
import { Board } from './features/GameBoard/Board';
import { Gameboard } from './game/Gameboard';

function App() {
  const game = new Gameboard();
  game.placeRandom();
  return (
    <>
      <Board gameboard={game} />
    </>
  )
}

export default App
