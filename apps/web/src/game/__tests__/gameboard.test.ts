import { Gameboard, ICell } from "../gameboard";

describe("Test Gameboard interface", () => {

    describe("Test game board initialization", () => {
        let board: Gameboard;
        beforeEach(() => {
            board = new Gameboard("classic", 3);
        });

        it("Should contain getBoard method", () => {
            expect(typeof board.getBoard).toBe("function");
        });

        it("should initialize all board cells with the correct type", () => {
            const exampleBoard: ICell[][] = [
                [{ shipId: null, isHit: false }, { shipId: null, isHit: false }, { shipId: null, isHit: false }],
                [{ shipId: null, isHit: false }, { shipId: null, isHit: false }, { shipId: null, isHit: false }],
                [{ shipId: null, isHit: false }, { shipId: null, isHit: false }, { shipId: null, isHit: false }]
            ];
            expect(board.getBoard()).toEqual(exampleBoard);
        })
    });

    it("Should contain receiveAttack method", () => {
        const board = new Gameboard();
        expect(typeof board.receiveAttack).toBe("function");
    });
});