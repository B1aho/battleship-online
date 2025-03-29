import { ICell } from "@/src/game/types";
import { ReactElement } from "react";

export function createCells(
    grid: ICell[][],
    attackFn: (x: number, y: number) => void,
): ReactElement[] {
    const cells = [];
    const size = grid.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const { shipId, isHit } = grid[i]![j]!;
            let symbol = " ";
            switch (true) {
                case (shipId !== null && isHit):
                    symbol = "x";
                    break;
                case (shipId !== null):
                    symbol = "#";
                    break;
                case (isHit):
                    symbol = "0";
                    break;
                default:
                    break;
            }
            cells.push(
                <div key={`${i}-${j}`}
                    className="w-full cursor-pointer hover:bg-blue-300 transition-all ease-in-out text-center outline-1"
                    onPointerUp={() => attackFn(j, i)}>
                    {symbol}
                </div>
            );
        }
    }
    return cells;
}