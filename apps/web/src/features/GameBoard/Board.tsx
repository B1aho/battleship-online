import { ClassicMode, IGameboard } from "@/src/game/types";
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
    const cells: ReactElement[] = useMemo(() => createCells(grid, ClassicMode.SIZE), [grid]);

    return (
        <>
            <BoardView cells={cells} />
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