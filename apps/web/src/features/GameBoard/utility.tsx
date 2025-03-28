import { ICell } from "@/src/game/types";
import { ReactElement } from "react";

export function createCells(grid: ICell[][], size: number): ReactElement[] {
    const cells = []
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const { shipId, isHit } = grid[i]![j]!;
            let symbol = " ";
            switch (true) {
                case (!!shipId && isHit):
                    symbol = "x";
                    break;
                case (!!shipId):
                    symbol = "#";
                    break;
                case (isHit):
                    symbol = "0";
                    break;
                default:
                    break;
            }
            cells.push(<div key={`${i}-${j}`} className="w-full text-center outline-1">{symbol}</div>);
        }
    }
    return cells;
}