import { Ship } from "./Ship";
import { IGameMode, IPlace, ICell, ICoord, IGameboard, IShip, ClassicMode } from "./types";

/**
 * The ClassicGameMode class represent battleship mode with classic rules. It responsible for:
 * grid size, number of ships, kind of ships, coordinates validating and attack rules
 */
export class ClassicGameMode implements IGameMode {
    /**
     * Check if ship could be in specific place
     * @param placeInfo - description of place includes: start and end coords, ship direction
     * @param shipId - number represents ship
     * @param grid - game's grid
     * @returns true - if place is valid, false - otherwise
     */
    isValidPlace(placeInfo: IPlace, shipId: number, grid: ICell[][]) {
        const { start, end } = placeInfo;
        // Check if cells exist
        if (end.x >= ClassicMode.SIZE || end.y >= ClassicMode.SIZE)
            return false;
        // Check if all target cells is empty and if perimeter empty
        if (!this.#isCellsEmpty(start, end, shipId, grid))
            return false;
        return true;
    };

    /**
     * Checks if the cells (target cells and the surrounding perimeter) are free to place a ship on them
     * @param begin - coord of start target cell
     * @param end - coord of start target cell
     * @param shipId - number represents ship
     * @param grid - game's grid
     * @returns true - if all cells are free, false - otherwise
     */
    #isCellsEmpty(begin: ICoord, end: ICoord, shipId: number, grid: ICell[][]): boolean {
        const rowStart = Math.max(0, begin.y - 1);
        const rowEnd = Math.min(ClassicMode.SIZE - 1, end.y + 1);
        const colStart = Math.max(0, begin.x - 1);
        const colEnd = Math.min(ClassicMode.SIZE - 1, end.x + 1);

        for (let y = rowStart; y <= rowEnd; y++) {
            for (let x = colStart; x <= colEnd; x++) {
                if (grid[y]![x]!.shipId && grid[y]![x]!.shipId !== shipId) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * Fill target cells with value
     * @param place - description of place includes: start and end coords, ship direction
     * @param value - value that will be placed into Сell.shipId 
     * @param grid - Game's grid
     */
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

    /**
     * Init and return classic set of ships from smaller to bigger
     * @returns array of ships in order by it lengths: 1, 1, 1, 1, 2, 2, 2, 3, 3, 4
     */
    initShips() {
        const ships: IShip[] = Array.from({ length: +ClassicMode.SIZE });
        for (let i = 1, idx = 0; i <= ClassicMode.MAX_SHIP; i++) {
            let shipsNum = ClassicMode.MAX_SHIP + 1 - i;
            while (shipsNum) {
                ships[idx++] = new Ship(i);
                shipsNum--;
            }
        }
        return ships;
    }

    /**
     * Init and return game's grid
     * @returns 10x10 grid
     */
    initBoard() {
        const grid: ICell[][] = Array.from({ length: +ClassicMode.SIZE });
        grid.forEach((_, idx) => {
            const row: ICell[] = Array.from({ length: +ClassicMode.SIZE }, () => ({ shipId: null, isHit: false }));
            if (grid) grid[idx] = row;
        })
        return grid;
    }

    /**
     * Check if coordinates belong to grid
     * @param x - columns
     * @param y - row
     * @returns true - if belong; false - otherwise
     */
    isValidCoords(x: number, y: number): boolean {
        return (x >= 0 && x < ClassicMode.SIZE && y >= 0 && y < ClassicMode.SIZE);
    }

    /**
     * Detect ship's hit, miss, sunk 
     * @param coord - coordinates of opponent's hit
     * @param gameboard - instance of Gameboard
     * @returns string that represent result of attack
     */
    handleAttack(coord: ICoord, gameboard: IGameboard): string {
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