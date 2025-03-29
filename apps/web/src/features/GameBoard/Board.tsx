import { HitResults, IGameboard, ModeType } from "@/src/game/types";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { createCells } from "./utility";
import { BoardView } from "./BoardView";

interface IBroadProps {
    gameboard: IGameboard;
}

export const Board = ({ gameboard }: IBroadProps) => {
    const [grid, setGrid] = useState(gameboard.getGrid());
    // const [ships, setShips] = useState(gameboard.getShips());
    const { SIZE, GRID } = ModeType[gameboard.getMode()];

    const attackFn = useCallback((x: number, y: number) => {
        if (gameboard.receiveAttack({ x, y }) === HitResults.GAMEOVER)
            console.log("GAME OVER")
        setGrid(gameboard.getGrid().map(row => [...row]));
    }, [gameboard]);

    const cells: ReactElement[] = useMemo(() => {
        return createCells(grid, attackFn);
    }, [grid, attackFn]);

    return (
        <>
            <BoardView cells={cells} gridType={GRID} gridSize={SIZE} />
        </>
    );
}