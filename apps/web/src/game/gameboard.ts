import { Ship } from "./ship";

type GameMode = "classic" | "other";

interface ICoord {
    x: number;
    y: number;
}

export interface ICell {
    shipId: number | null;
    isHit: boolean;
}

type Direction = "horizontal" | "vertical";

interface IGameboard {
    getBoard: () => ICell[][];
    receiveAttack: (coord: ICoord) => boolean;
    placeShip: (coord: ICoord, shipId: number, direction: Direction) => boolean;
}

const CLASSIC_SIZE = 10;
const CLASSIC_MAX_SHIP = 4;

export class Gameboard implements IGameboard {
    #board: ICell[][] = [];
    // Набор кораблей доступный для расстановки от самых больших к самым маленьким
    #ships: Ship[] = [];
    constructor(gameMode: GameMode = "classic", size = CLASSIC_SIZE) {
        if (size < 0) throw new Error("Size can't be negative");
        this.#initBoard(size); // Убрать size вообще - определяется на основе gameMode
        this.#initShips(gameMode);
    }

    getBoard() {
        return this.#board ?? [];
    }

    getShips() {
        return this.#ships;
    }

    placeShip(beginCoord: ICoord, shipId: number, direction: Direction) {
        const targetShip = this.#ships[shipId];
        if (!targetShip) return false;
        const length = targetShip.length() - 1;
        // Calculate end cell's coordinates
        const endCoord: ICoord = direction === "horizontal"
            ? { x: beginCoord.x + length, y: beginCoord.y }
            : { x: beginCoord.x, y: beginCoord.y + length }
        // Check if cells exist
        if (endCoord.x >= CLASSIC_SIZE || endCoord.y >= CLASSIC_SIZE)
            return false;
        // Check if all target cells is empty and if perimeter empty
        if (!this.#isCellsEmpty(beginCoord, endCoord, direction))
            return false;
        // Place the ship
        let idx = 0;
        while (idx < length) {
            const x = direction === "horizontal" ? beginCoord.x + idx : beginCoord.x;
            const y = direction === "vertical" ? beginCoord.y + idx : beginCoord.y;

            if (this.#board[x] && this.#board[x][y]) {
                this.#board[x][y].shipId = shipId;
            }
            idx++;
        }
        targetShip.isPlaced = true;
        return true;
    };

    #isCellsEmpty(begin: ICoord, end: ICoord, direction: Direction): boolean {
        return true;
    };

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
        this.#board = Array.from({ length: size });
        this.#board.forEach((_, idx) => {
            const row: ICell[] = Array.from({ length: size });
            row.fill({ isHit: false, shipId: null })
            if (this.#board) this.#board[idx] = row;
        })
    }

    receiveAttack(coord: ICoord) {
        return true;
    };
}