import { Ship } from "../ship";

describe("Test Ship interface", () => {

    describe("Check if all methods of public interface exist", () => {
        let ship: Ship;
        beforeEach(() => {
            ship = new Ship();
        });

        it("The ship should have method that return it length", () => {
            expect(typeof ship.length).toBe("function");
        });

        it("The ship should have method that that calculates whether a ship is considered sunk", () => {
            expect(typeof ship.isSunk).toBe("function");
        });

        it("The ship should have method that increases the number of hits in ship", () => {
            expect(typeof ship.hit).toBe("function");
        });
    });

    describe("Test Ship instance creation", () => {
        it("The ship should be as long as specified when the instance was created", () => {
            const ship = new Ship(7);
            expect(ship.length()).toBe(7);
        });

        it("The ship length can't be smaller then 1", () => {
            expect(() => new Ship(-3)).toThrow("Ship's length must be >= 1");
            expect(() => new Ship(0)).toThrow("Ship's length must be >= 1");
        });
    });

    describe("Should correct update hit count and determine if the ship is sunk", () => {
        it("Check if ship hits equal length then ship sunk", () => {
            const ship = new Ship(3);
            ship.hit();
            ship.hit();
            expect(ship.isSunk()).toBe(false);
            ship.hit();
            expect(ship.isSunk()).toBe(true);
        });

        it("Check if ship sunk when hits more then ship length", () => {
            const ship = new Ship(1);
            ship.hit();
            ship.hit();
            expect(ship.isSunk()).toBe(true);
        })

    });

});