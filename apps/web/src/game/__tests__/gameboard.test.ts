import { Gameboard, ICell } from "../gameboard";
import { Ship } from "../ship";

describe("Test Gameboard interface for classic mode", () => {

    describe("Test game board initialization", () => {
        let board: Gameboard;
        beforeEach(() => {
            board = new Gameboard("classic", 3);
        });

        it("should contain getBoard method", () => {
            expect(typeof board.getBoard).toBe("function");
        });

        it("should initial board cells with the correct type", () => {
            const exampleBoard: ICell[][] = [
                [{ shipId: null, isHit: false }, { shipId: null, isHit: false }, { shipId: null, isHit: false }],
                [{ shipId: null, isHit: false }, { shipId: null, isHit: false }, { shipId: null, isHit: false }],
                [{ shipId: null, isHit: false }, { shipId: null, isHit: false }, { shipId: null, isHit: false }]
            ];
            expect(board.getBoard()).toEqual(exampleBoard);
        });
    });

    describe("Test ship initalization method", () => {
        let board: Gameboard;
        beforeEach(() => {
            board = new Gameboard("classic");
        });

        it("should exist method to get list of board's ships", () => {
            expect(typeof board.getShips).toBe("function");
        })

        it("should init right ships configuration from smaller to bigger", () => {
            const rightShipConfiguration: Ship[] = [
                new Ship(1), new Ship(1), new Ship(1), new Ship(1),
                new Ship(2), new Ship(2), new Ship(2),
                new Ship(3), new Ship(3),
                new Ship(4)
            ];
            expect(board.getShips()).toEqual(rightShipConfiguration);
        });
    })

    describe("Test ship placement", () => {
        let board: Gameboard;
        beforeEach(() => {
            board = new Gameboard("classic");
        });

        it("should exist method to place ship", () => {
            expect(typeof board.placeShip).toBe("function");
        });

        it("should be able to place ship on board #1", () => {
            const grid = board.getBoard();
            board.placeShip({ x: 0, y: 0 }, 4, "horizontal");
            const cellView: ICell = { shipId: 4, isHit: false };
            expect(grid).not.toBeUndefined();
            expect(grid[0]?.[0]).toEqual(cellView);
            expect(grid[0]?.[1]).toEqual(cellView);
            expect(grid[0]?.[2]).not.toEqual(cellView);
        });

        it("should be able to place ship on board #2", () => {
            board.placeShip({ x: 3, y: 3 }, 7, "horizontal");
            const cellView: ICell = { shipId: 7, isHit: false };
            const grid = board.getBoard();
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
    });

    it("should contain receiveAttack method", () => {
        const board = new Gameboard();
        expect(typeof board.receiveAttack).toBe("function");
    });
});