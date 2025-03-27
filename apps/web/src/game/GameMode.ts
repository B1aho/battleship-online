import { Gameboard, ICell, ICoord, IPlace } from "./Gameboard";
import { Ship } from "./Ship";

export interface IGameMode {
    isValidPlace: (placeInfo: IPlace, shipId: number, grid: ICell[][]) => boolean;
    utilityPlace: (place: IPlace, value: null | number, grid: ICell[][]) => void;
    initShips: () => Ship[];
    initBoard: () => ICell[][];
    isValidCoords: (x: number, y: number) => boolean;
    handleAttack: (coord: ICoord, gameboard: Gameboard) => string;
}

const CLASSIC_SIZE = 10;
const CLASSIC_MAX_SHIP = 4;

export class ClassicGameMode implements IGameMode {
    isValidPlace(placeInfo: IPlace, shipId: number, grid: ICell[][]) {
        const { start, end } = placeInfo;
        // Check if cells exist
        if (end.x >= CLASSIC_SIZE || end.y >= CLASSIC_SIZE)
            return false;
        // Check if all target cells is empty and if perimeter empty
        if (!this.#isCellsEmpty(start, end, shipId, grid))
            return false;
        return true;
    };

    #isCellsEmpty(begin: ICoord, end: ICoord, shipId: number, grid: ICell[][]): boolean {
        const rowStart = Math.max(0, begin.y - 1);
        const rowEnd = Math.min(CLASSIC_SIZE - 1, end.y + 1);
        const colStart = Math.max(0, begin.x - 1);
        const colEnd = Math.min(CLASSIC_SIZE - 1, end.x + 1);

        for (let y = rowStart; y <= rowEnd; y++) {
            for (let x = colStart; x <= colEnd; x++) {
                if (grid[y]![x]!.shipId && grid[y]![x]!.shipId !== shipId) {
                    return false;
                }
            }
        }
        return true;
    };

    utilityPlace(place: IPlace, value: null | number, grid: ICell[][]) {
        const { start, end, direction } = place;
        let idx = 0;
        const length = direction === "horizontal" ? (end.x - start.x + 1) : (end.y - start.y + 1);
        while (idx < length) {
            const x = direction === "horizontal" ? start.x + idx : start.x;
            const y = direction === "vertical" ? start.y + idx : start.y;

            grid[y]![x]!.shipId = value;
            idx++;
        }
    }

    initShips() {
        const ships: Ship[] = Array.from({ length: CLASSIC_SIZE });
        for (let i = 1, idx = 0; i <= CLASSIC_MAX_SHIP; i++) {
            let shipsNum = CLASSIC_MAX_SHIP + 1 - i;
            while (shipsNum) {
                ships[idx++] = new Ship(i);
                shipsNum--;
            }
        }
        return ships;
    }

    initBoard() {
        const grid: ICell[][] = Array.from({ length: CLASSIC_SIZE });
        grid.forEach((_, idx) => {
            const row: ICell[] = Array.from({ length: CLASSIC_SIZE }, () => ({ shipId: null, isHit: false }));
            if (grid) grid[idx] = row;
        })
        return grid;
    }

    isValidCoords(x: number, y: number): boolean {
        return (x >= 0 && x < CLASSIC_SIZE && y >= 0 && y < CLASSIC_SIZE);
    }

    handleAttack(coord: ICoord, gameboard: Gameboard): string {
        const { x, y } = coord;
        const grid = gameboard.getGrid();
        const ships = gameboard.getShips();
        const cell = grid[y]![x];
        if (!cell)
            throw new Error("Cell is undefined");;
        if (cell.isHit) return "Move has already been made";
        cell.isHit = true;
        const shipId = cell.shipId;
        if (!shipId) return "Miss";
        const hittedShip = ships[shipId];
        if (!hittedShip)
            throw new Error("Ship is undefined");
        hittedShip.hit();
        // Check if sunk
        if (hittedShip.isSunk()) {
            gameboard.incrementSunk();
            if (gameboard.checkAllSunk())
                return "Hit. Game over."
            else return "Hit. Sunk.";
        }
        return "Hit";
    }
}