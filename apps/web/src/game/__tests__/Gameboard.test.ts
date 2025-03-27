import { Gameboard } from "../Gameboard";
import { IGameboard, ICell } from "../types";

describe("Test Gameboard interface for classic mode", () => {

    describe("Test gameboard's ship placement", () => {
        let board: IGameboard;
        beforeEach(() => {
            board = new Gameboard("classic");
        });

        it("should exist method to place ship", () => {
            expect(typeof board.placeShip).toBe("function");
        });

        it("should be able to place ship on board #1", () => {
            const grid = board.getGrid();
            const cellView: ICell = { shipId: 4, isHit: false };
            board.placeShip({ x: 0, y: 0 }, 4, "horizontal");
            expect(grid).not.toBeUndefined();
            expect(grid[0]?.[0]).toEqual(cellView);
            expect(grid[0]?.[1]).toEqual(cellView);
            expect(grid[0]?.[2]).not.toEqual(cellView);
        });

        it("should be able to place ship on board #2", () => {
            const cellView: ICell = { shipId: 7, isHit: false };
            const grid = board.getGrid();
            board.placeShip({ x: 3, y: 3 }, 7, "horizontal");
            expect(grid).not.toBeUndefined();
            expect(grid[3]?.[3]).toEqual(cellView);
            expect(grid[3]?.[4]).toEqual(cellView);
            expect(grid[3]?.[5]).toEqual(cellView);
            expect(grid[3]?.[6]).not.toEqual(cellView);
            expect(grid[4]?.[3]).not.toEqual(cellView);
        });

        it("shouldn't be able to place ship on board outer the bounds", () => {
            expect(board.placeShip({ x: 8, y: 8 }, 9, "vertical"))
                .toBe(false);
        });

        it("shouldn't place two ships too close", () => {
            board.placeShip({ x: 0, y: 0 }, 4, "horizontal");
            expect(board.placeShip({ x: 2, y: 0 }, 5, "horizontal"))
                .toBe(false);
        });

        it("shouldn't place two ships too close", () => {
            board.placeShip({ x: 1, y: 0 }, 9, "vertical");
            expect(board.placeShip({ x: 0, y: 4 }, 5, "vertical"))
                .toBe(false);
            expect(board.placeShip({ x: 0, y: 5 }, 5, "vertical"))
                .toBe(true);
        });

        it("should be able to replace ship", () => {
            board.placeShip({ x: 1, y: 0 }, 9, "vertical");
            const emptyCell: ICell = { shipId: null, isHit: false };
            const shipCell: ICell = { shipId: 9, isHit: false };
            const grid = board.getGrid();
            expect(board.placeShip({ x: 0, y: 4 }, 5, "vertical"))
                .toBe(false);
            expect(board.placeShip({ x: 1, y: 2 }, 9, "vertical"))
                .toBe(true);
            expect(grid[0]?.[1]).toEqual(emptyCell);
            expect(grid[1]?.[1]).toEqual(emptyCell);
            expect(grid[2]?.[1]).toEqual(shipCell);
            expect(grid[5]?.[1]).toEqual(shipCell);
        });

        it("should be able to place ships on edges", () => {
            const firstShipCell: ICell = { shipId: 8, isHit: false };
            const grid = board.getGrid();
            board.placeShip({ x: 0, y: 0 }, 8, "horizontal");
            expect(grid).not.toBeUndefined();
            expect(grid[0]?.[0]).toEqual(firstShipCell);
            expect(grid[0]?.[2]).toEqual(firstShipCell);
            expect(grid[0]?.[3]).not.toEqual(firstShipCell);

            const secondShipCell: ICell = { shipId: 9, isHit: false };
            board.placeShip({ x: 9, y: 1 }, 9, "vertical");
            expect(grid[1]?.[9]).toEqual(secondShipCell);
            expect(grid[4]?.[9]).toEqual(secondShipCell);
            expect(grid[5]?.[9]).not.toEqual(secondShipCell);
        });

    });

    describe("Test gameBoard's attack method", () => {
        let board: IGameboard;
        beforeEach(() => {
            board = new Gameboard("classic");
        });

        it("should contain receiveAttack method", () => {
            const board = new Gameboard();
            expect(typeof board.receiveAttack).toBe("function");
        });

        it("should achive ship's hit", () => {
            board.placeShip({ x: 0, y: 0 }, 8, "vertical");
            board.receiveAttack({ x: 0, y: 0 });
            board.receiveAttack({ x: 0, y: 1 });
            expect(board.getShips()[8]?.isSunk()).toEqual(false);
            board.receiveAttack({ x: 0, y: 2 });
            expect(board.getShips()[8]?.isSunk()).toEqual(true);
        });

        it("should detect miss, hit, sunk", () => {
            board.placeShip({ x: 4, y: 6 }, 8, "horizontal");
            expect(board.receiveAttack({ x: 4, y: 6 }))
                .toBe("Hit");
            expect(board.receiveAttack({ x: 5, y: 6 }))
                .toBe("Hit");
            expect(board.receiveAttack({ x: 3, y: 8 }))
                .toBe("Miss");
            expect(board.receiveAttack({ x: 4, y: 6 }))
                .toBe("Move has already been made");
            expect(board.receiveAttack({ x: 6, y: 6 }))
                .toBe("Hit. Sunk.");
        });

        it("should handle outer bounds coordinates", () => {
            expect(() => board.receiveAttack({ x: -2, y: 0 }))
                .toThrow("Coordinates are not valid");
        })
    })
});