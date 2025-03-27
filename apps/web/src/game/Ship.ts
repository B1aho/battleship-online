import { IShip } from "./types";

export class Ship implements IShip {
    #length = 1;
    #hits = 0;
    constructor(length: number = 1) {
        if (length <= 0) {
            throw new Error("Ship's length must be >= 1");
        }
        this.#length = length;
    }
    length() {
        return this.#length;
    }

    isSunk() {
        return this.#length <= this.#hits;
    }

    hit() {
        if (!this.isSunk())
            this.#hits++;
    }
}