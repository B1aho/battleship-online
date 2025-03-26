interface IShip {
    length: () => number;
    hit: () => void;
    isSunk: () => boolean;
}

export class Ship implements IShip {
    #ship: boolean[] | null = null;
    #length = 1;
    #hits = 0;
    constructor(length: number = 1) {
        if (length <= 0) {
            throw new Error("Ship's length must be >= 1");
        }
        this.#ship = Array.from({ length });
        this.#ship.fill(false);
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