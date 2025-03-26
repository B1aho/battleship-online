import { Gameboard } from "../gameboard";

describe("Test Gameboard interface", () => {
    it("Check if receiveAttack method exist", () => {
        const board = new Gameboard();
        expect(typeof board.receiveAttack).toBe("function");
    });
});