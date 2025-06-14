import { IShip } from "./types/index.js";

/**
 * The Ship class represents a ship in the game
 * It keeps track of its length, the number of times it has been hit,
 * and determines whether it is sunk
 */
export class Ship implements IShip {
    #length = 1;
    #hits = 0;

    /**
     * Creates a new Ship instance.
     * @param length - The length of the ship (must be at least 1)
     * @throws Error if the provided length is less than or equal to 0.
     */
    constructor(length: number = 1) {
        if (length <= 0) {
            throw new Error("Ship's length must be >= 1");
        }
        this.#length = length;
    }

    /**
     * Returns the length of the ship.
     * @returns The length of the ship.
     */
    length() {
        return this.#length;
    }

    /**
     * Checks if the ship is sunk.
     * A ship is considered sunk if the number of hits is equal to or greater than its length.
     * @returns True if the ship is sunk, false otherwise.
     */
    isSunk() {
        return this.#length <= this.#hits;
    }

    /**
     * Registers a hit on the ship.
     * Increments the hit counter if the ship is not yet sunk.
     */
    hit() {
        if (!this.isSunk())
            this.#hits++;
    }
}