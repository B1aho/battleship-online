import { Ship } from "./ship";

type GameMode = "classic" | "other";

interface ICoord {
    x: number;
    y: number;
}

interface IPlace {
    start: ICoord;
    end: ICoord;
    direction: Direction;
}

export interface ICell {
    shipId: number | null;
    isHit: boolean;
}

type Direction = "horizontal" | "vertical";

interface IGameboard {
    getGrid: () => ICell[][];
    receiveAttack: (coord: ICoord) => boolean;
    placeShip: (coord: ICoord, shipId: number, direction: Direction) => boolean;
}

const CLASSIC_SIZE = 10;
const CLASSIC_MAX_SHIP = 4;

export class Gameboard implements IGameboard {
    #grid: ICell[][] = [];
    // Набор кораблей доступный для расстановки от самых больших к самым маленьким
    #ships: Ship[] = [];
    #shipsPlacement: Map<string, IPlace> = new Map();
    constructor(gameMode: GameMode = "classic", size = CLASSIC_SIZE) {
        if (size < 0) throw new Error("Size can't be negative");
        this.#initBoard(size); // Убрать size вообще - определяется на основе gameMode
        this.#initShips(gameMode);
    }

    getGrid() {
        return this.#grid ?? [];
    }

    getShips() {
        return this.#ships;
    }

    placeShip(beginCoord: ICoord, shipId: number, direction: Direction) {
        const targetShip = this.#ships[shipId];
        if (!targetShip) return false;
        const lastPlacement = this.#shipsPlacement.get(shipId.toString());
        const length = targetShip.length() - 1;
        // Calculate end cell's coordinates
        const endCoord: ICoord = direction === "horizontal"
            ? { x: beginCoord.x + length, y: beginCoord.y }
            : { x: beginCoord.x, y: beginCoord.y + length }
        // Check if cells exist
        if (endCoord.x >= CLASSIC_SIZE || endCoord.y >= CLASSIC_SIZE)
            return false;
        // Check if all target cells is empty and if perimeter empty
        if (!this.#isCellsEmpty(beginCoord, endCoord, shipId))
            return false;
        // Clear last placement if had
        if (lastPlacement) {
            this.#utilityPlace(lastPlacement, null);
        }
        // Place the ship
        this.#utilityPlace({
            start: beginCoord,
            end: endCoord,
            direction: direction,
        }, shipId)

        // Save current ship's place
        this.#shipsPlacement.set(shipId.toString(), {
            start: beginCoord,
            end: endCoord,
            direction: direction
        });
        return true;
    };

    #isCellsEmpty(begin: ICoord, end: ICoord, shipId: number): boolean {
        const rowStart = Math.max(0, begin.y - 1);
        const rowEnd = Math.min(CLASSIC_SIZE - 1, end.y + 1);
        const colStart = Math.max(0, begin.x - 1);
        const colEnd = Math.min(CLASSIC_SIZE - 1, end.x + 1);

        for (let y = rowStart; y <= rowEnd; y++) {
            for (let x = colStart; x <= colEnd; x++) {
                if (this.#grid[y]![x]!.shipId && this.#grid[y]![x]!.shipId !== shipId) {
                    return false;
                }
            }
        }
        return true;
    };

    #utilityPlace(place: IPlace, value: null | number) {
        const { start, end, direction } = place;
        let idx = 0;
        const length = direction === "horizontal" ? (end.x - start.x + 1) : (end.y - start.y + 1);
        while (idx < length) {
            const x = direction === "horizontal" ? start.x + idx : start.x;
            const y = direction === "vertical" ? start.y + idx : start.y;

            this.#grid[y]![x]!.shipId = value;
            idx++;
        }
    }

    #initShips(mode: GameMode) {
        if (mode === "classic") {
            this.#ships = Array.from({ length: CLASSIC_SIZE });
            for (let i = 1, idx = 0; i <= CLASSIC_MAX_SHIP; i++) {
                let shipsNum = CLASSIC_MAX_SHIP + 1 - i;
                while (shipsNum) {
                    this.#ships[idx++] = new Ship(i);
                    shipsNum--;
                }
            }
        }
    }

    #initBoard(size: number) {
        this.#grid = Array.from({ length: size });
        this.#grid.forEach((_, idx) => {
            const row: ICell[] = Array.from({ length: size }, () => ({ shipId: null, isHit: false }));
            if (this.#grid) this.#grid[idx] = row;
        })
    }

    receiveAttack(coord: ICoord) {
        return true;
    };
}