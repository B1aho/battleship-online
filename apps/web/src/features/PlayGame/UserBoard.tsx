import { Gameboard } from "@/src/game/Gameboard"
import { Board } from "../GameBoard/Board";

export const UserBoard = () => {
    const board = new Gameboard();
    return <div>
        <Board gameboard={board} />
    </div>
}