import { HitResults, IGameboard, ModeType } from "@/src/game/types";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { createCells, createShips } from "./utility.js";
import { BoardView } from "./BoardView.js";
import { ShipsView } from "./ShipsView.js";

interface IBroadProps {
    gameboard: IGameboard;
}

export const Board = ({ gameboard }: IBroadProps) => {
    const [grid, setGrid] = useState(gameboard.getGrid());
    const [ships, setShips] = useState(gameboard.getShips());
    const { SIZE, GRID } = ModeType[gameboard.getMode()];

    const attackFn = useCallback((x: number, y: number) => {
        const attackResult = gameboard.receiveAttack({ x, y });
        if (attackResult === HitResults.SUNK || attackResult === HitResults.GAMEOVER)
            setShips(gameboard.getShips().map(ship => ship));
        if (attackResult === HitResults.GAMEOVER)
            console.log("GAME OVER")
        setGrid(gameboard.getGrid().map(row => [...row]));
    }, [gameboard]);

    const cells: ReactElement[] = useMemo(() => {
        return createCells(grid, attackFn);
    }, [grid, attackFn]);

    const shipBlocks: ReactElement[][] = useMemo(() => {
        return createShips(ships);
    }, [ships]);

    return (
        <div className="relative flex">
            <ShipsView ships={shipBlocks} className="relative top-10" />
            <BoardView cells={cells} gridType={GRID} gridSize={SIZE} />
        </div>
    );
}