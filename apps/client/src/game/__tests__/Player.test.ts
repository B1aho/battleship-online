import { Connection, Player } from "../Player.js";

describe("Test Player class interface", () => {
    let player: Player;
    beforeEach(() => {
        player = new Player("Patrik", Connection.OFFLINE);
    });
    it("should have gameboard", () => {
        expect(player.board).not.toBe(undefined);
        expect(player.board.getGrid()[0]![0])
            .not.toBe(undefined);
    });

    it("should be able to make move", () => {
        expect(typeof player.makeMove).toBe("function");
    });
});