import { ClassicGameMode } from "./GameMode.js";
import {
    IGameboard,
    ICell,
    Direction,
    GameMode,
    ICoord,
    IPlace,
    IShip,
    IGameMode,
    HitResults,
    ModeType
} from "./types/index.js";

/**
 * The GameBoard class represents the playing board of the game.
 * It is responsible for managing the grid, ships placements, and handling attacks.
 *
 * Game modes are incorporated through the Strategy pattern: 
 * This design allows the game to be easily extended with new modes without modifying
 * the core GameBoard logic.
 */
export class Gameboard implements IGameboard {
    // private mediator: BoardMediator | null = null;

    // // Установить связь с медиатором
    // setMediator(mediator: BoardMediator | null) {
    //     this.mediator = mediator;
    // }

    // // При изменении доски уведомляем медиатор
    // onUserAction(action: Action) {
    //     const event = this.createEvent(action);
    //     this.mediator?.notifyChange(this, event);
    // }

    // // Обработчик событий от других досок
    // handleEvent(event: Event) {
    //     // Применить изменения из event
    //     console.log("Доска получила обновление:", event);
    // }
    #grid: ICell[][] = [];
    /**
     * An array of ships available for placement, ordered from the largest to the smallest
     */
    #ships: IShip[] = [];
    /**
     * A map containing information about the current ship placement – useful when repositioning an already placed ship
     */
    #shipsPlacement: Map<string, IPlace> = new Map();
    #sunked = 0;
    #gameMode: IGameMode | null = null;
    #mode: GameMode = "classic";

    /**
     * Create game board due to chosen game mode
     * @param gameMode - represent mode of current game
     */
    constructor(gameMode: GameMode = "classic") {
        if (gameMode === "classic") {
            this.#mode = "classic";
            this.#gameMode = new ClassicGameMode();
        }
        if (this.#gameMode) {
            this.#grid = this.#gameMode.initBoard();
            this.#ships = this.#gameMode.initShips();
        }
    }

    /**
     * Return current game mode's name
     * @returns string that represent mode's name
     */
    getMode() {
        return this.#mode;
    }

    /**
     * Return grid
     * @returns current grid
     */
    getGrid() {
        return this.#grid ?? [];
    }

    /**
    * Returns the array of ships available on the game board.
    * @returns The list of ships.
    */
    getShips() {
        return this.#ships;
    }

    /**
     * @returns Number of placed ships
     */
    getPlacedShipsNum(): number {
        return this.#shipsPlacement.size;
    }

    /**
    * Increments the count of sunk ships.
    */
    incrementSunk() {
        this.#sunked++;
    }

    /**
    * Checks if all ships have been sunk.
    * @returns True if the number of sunk ships equals the total number of ships, otherwise false.
    */
    checkAllSunk(): boolean {
        return this.#sunked === this.#ships.length;
    }

    /**
    * Handles the placement of a ship on the board at specific coordinates.
    *
    * It validates the placement with the game mode strategy,
    * clears any previous placement of the ship, places the ship on the grid, and saves
    * the current placement.
    *
    * @param beginCoord - The starting coordinate for the ship placement.
    * @param shipId - The identifier of the ship to be placed.
    * @param direction - The direction in which to place the ship (horizontal or vertical).
    * @returns True if the ship is successfully placed, otherwise false.
    */
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

    /**
     * This method place all avaliable ships in random order
     * @returns 
     */
    placeRandom() {
        let shipId = 0;

        while (this.getPlacedShipsNum() < ModeType.classic.SIZE) {
            let isPlaced = false
            while (!isPlaced) {
                const x = Math.floor(Math.random() * ModeType.classic.SIZE);
                const y = Math.floor(Math.random() * ModeType.classic.SIZE);
                const direction: Direction = Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical";
                isPlaced = this.placeShip({ x, y }, shipId, direction);
            }
            shipId++;
        }
        return true;
    }

    /**
    * Handles an attack on the game board at the specified coordinates.
    *
    * Validates the coordinates using the game mode strategy and then delegates the attack
    * handling to the game mode's attack logic. If all ships are sunk, it returns a message indicating
    * that the game is over.
    *
    * @param coord - The coordinates of the attack.
    * @returns A message indicating the result of the attack.
    * @throws If the coordinates are not valid.
    */
    receiveAttack(coord: ICoord) {
        if (!this.#gameMode?.isValidCoords(coord.x, coord.y))
            throw new Error("Coordinates are not valid");
        if (this.checkAllSunk())
            return "Game is over. No further moves allowed."
        const result = this.#gameMode.handleAttack(coord, this);
        if (result === HitResults.GAMEOVER || result === HitResults.SUNK) {
            const shipId = this.#grid[coord.y]![coord.x]!.shipId;
            if (shipId === null) return result;
            const shipInfo = this.#shipsPlacement.get(shipId.toString());
            if (!shipInfo) return result;
            this.#gameMode.markSurroundedCells(shipInfo.start, shipInfo.end, this.#grid);
        }
        return result;
    };
}