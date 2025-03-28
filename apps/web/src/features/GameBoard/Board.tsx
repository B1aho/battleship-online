import { IGameboard, ModeType } from "@/src/game/types";
import { ReactElement, useMemo, useState } from "react";
import { createCells } from "./utility";
import { Button } from "@workspace/ui/components/button";
import { BoardView } from "./BoardView";

interface IBroadProps {
    gameboard: IGameboard;
}

export const Board = ({ gameboard }: IBroadProps) => {
    const [grid, setGrid] = useState(gameboard.getGrid());
    const [ships, setShips] = useState(gameboard.getShips());
    const cells: ReactElement[] = useMemo(() => {
        return createCells(grid, ModeType[gameboard.getMode()].SIZE);
    }, [grid, gameboard]);

    return (
        <>
            <BoardView cells={cells} gridType={
                ModeType[gameboard.getMode()].GRID
            } />
            <Button onClick={() => {
                const res = gameboard.receiveAttack({ x: 0, y: 0 });
                if (res === "Hit") {
                    console.log("EQUAL");
                    setGrid(gameboard.getGrid().map(row => [...row]));
                }
            }}>
                Click
            </Button>
        </>
    );
}