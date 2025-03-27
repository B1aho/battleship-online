import { ClassicGameMode } from "./GameMode";
import {
    IGameboard,
    ICell,
    Direction,
    GameMode,
    ICoord,
    IPlace,
    IShip,
    IGameMode
} from "./types";

export class Gameboard implements IGameboard {
    #grid: ICell[][] = [];
    // Набор кораблей доступный для расстановки от самых больших к самым маленьким
    #ships: IShip[] = [];
    #shipsPlacement: Map<string, IPlace> = new Map();
    #sunked = 0;
    #gameMode: IGameMode | null = null;
    constructor(gameMode: GameMode = "classic") {
        if (gameMode === "classic")
            this.#gameMode = new ClassicGameMode();
        if (this.#gameMode) {
            this.#grid = this.#gameMode.initBoard();
            this.#ships = this.#gameMode.initShips();
        }
    }

    getGrid() {
        return this.#grid ?? [];
    }

    getShips() {
        return this.#ships;
    }

    incrementSunk() {
        this.#sunked++;
    }

    checkAllSunk(): boolean {
        return this.#sunked === this.#ships.length;
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
        const placeInfo: IPlace = {
            start: beginCoord,
            end: endCoord,
            direction
        }
        if (!this.#gameMode?.isValidPlace(placeInfo, shipId, this.#grid))
            return false;
        // Clear last placement if had
        if (lastPlacement) {
            this.#gameMode.utilityPlace(lastPlacement, null, this.#grid);
        }
        // Place the ship
        this.#gameMode?.utilityPlace(placeInfo, shipId, this.#grid);

        // Save current ship's place
        this.#shipsPlacement.set(shipId.toString(), placeInfo);
        return true;
    };

    receiveAttack(coord: ICoord) {
        if (!this.#gameMode?.isValidCoords(coord.x, coord.y))
            throw new Error("Coordinates are not valid");
        if (this.checkAllSunk())
            return "Game is over. No further moves allowed."
        return this.#gameMode.handleAttack(coord, this);
    };
}