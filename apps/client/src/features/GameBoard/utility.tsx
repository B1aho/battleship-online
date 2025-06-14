import { ICell, IShip } from "@/src/game/types";
import { JSX, ReactElement } from "react";

export function createCells(
    grid: ICell[][],
    attackFn?: (x: number, y: number) => void,
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
                    onPointerUp={() => {
                        if (!attackFn)
                            return [j, i];
                        return attackFn(j, i)
                    }}>{/* Добавить стили при условии если это opponent board*/}
                    {symbol}
                </div>
            );
        }
    }
    return cells;
}

export function createShips(ships: IShip[]) {
    const shipBlocks: JSX.Element[][] = [];
    let i = ships.length - 1;
    while (i >= 0) {
        const ship = ships[i];
        if (!ship) continue;
        const blocks = Array.from({ length: ship.length() }, (_, k) => {
            return <div key={`S-${k}`} className={"aspect-square w-2 " + (ship.isSunk() ? "bg-red-600" : "bg-neutral-500")}></div>
        })
        shipBlocks.push(blocks);
        i--;
    }
    return shipBlocks;
}