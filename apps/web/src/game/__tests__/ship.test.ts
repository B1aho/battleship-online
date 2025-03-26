import { Ship } from "../ship";

describe("Test Ship interface", () => {

    describe("Check if all methods of public interface exist", () => {
        let ship: Ship;
        beforeEach(() => {
            ship = new Ship();
        });

        it("Should contain method that return ship length", () => {
            expect(typeof ship.length).toBe("function");
        });

        it("Should contain method that that calculates whether a ship is considered sunk", () => {
            expect(typeof ship.isSunk).toBe("function");
        });

        it("Should contain method that increases the number of hits in ship", () => {
            expect(typeof ship.hit).toBe("function");
        });
    });

    describe("Test Ship length", () => {
        it("Should be as long as specified when the instance was created", () => {
            const ship = new Ship(7);
            expect(ship.length()).toBe(7);
        });

        it("Can't be smaller then 1", () => {
            expect(() => new Ship(-3)).toThrow("Ship's length must be >= 1");
            expect(() => new Ship(0)).toThrow("Ship's length must be >= 1");
        });
    });

    describe("Test integration between hit() and isSunk()", () => {
        it("Sould be sunk if ship got hits number equal ship's length", () => {
            const ship = new Ship(3);
            ship.hit();
            ship.hit();
            expect(ship.isSunk()).toBe(false);
            ship.hit();
            expect(ship.isSunk()).toBe(true);
        });

        it("Should be sunk if ship got hits number greater then ship's length", () => {
            const ship = new Ship(1);
            ship.hit();
            ship.hit();
            expect(ship.isSunk()).toBe(true);
        })

    });

});