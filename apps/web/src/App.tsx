import './App.css'
import { BoardView } from './features/GameBoard/BoardView'
import { Gameboard } from './game/Gameboard'

function App() {
  const game = new Gameboard();
  return (
    <>
      <BoardView grid={game.getGrid()} />
    </>
  )
}

export default App
