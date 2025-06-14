import { ClassicGameMode } from "../GameMode.js";
import { Ship } from "../Ship.js";

describe("Test classic game mode interface", () => {
    let mode: ClassicGameMode;
    beforeEach(() => {
        mode = new ClassicGameMode();
    });
    describe("Test game grid initialization", () => {
        it("should contain initBoard method", () => {
            expect(typeof mode.initBoard).toBe("function");
        });

        it("should return grid with the correct size", () => {
            expect(mode.initBoard().length).toEqual(10);
        });

        it("should return grid with the correct size", () => {
            expect(mode.initBoard()[0]!.length).toEqual(10);
        });
    });

    describe("Test ship initalization method", () => {
        it("should exist method that init and return Ship[]", () => {
            expect(typeof mode.initShips).toBe("function");
        })

        it("should init right ships configuration from smaller to bigger", () => {
            const rightShipConfiguration: Ship[] = [
                new Ship(1), new Ship(1), new Ship(1), new Ship(1),
                new Ship(2), new Ship(2), new Ship(2),
                new Ship(3), new Ship(3),
                new Ship(4)
            ];
            expect(mode.initShips()).toEqual(rightShipConfiguration);
        });
    });

    describe("Test hadnle attack method", () => {
        it("should exist method that handle ship's attack due to mode strategy", () => {
            expect(typeof mode.handleAttack).toBe("function");
        });
    })

});