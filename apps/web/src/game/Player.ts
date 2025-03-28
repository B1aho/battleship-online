import { Gameboard } from "./Gameboard";
import { ICoord } from "./types";

export enum Connection {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
}

export class Player {
    name = "";
    #gameConnection = Connection.ONLINE;
    board: Gameboard;

    constructor(name: string, gameConnection = Connection.ONLINE) {
        this.name = name;
        this.#gameConnection = gameConnection;
        this.board = new Gameboard();
    }

    // Метод для выполнения хода реальным игроком 
    makeMove(): ICoord {
        // Логика хода реального игрока, например, выбор координат через UI
        console.log(`${this.name} make a move`);
        return { x: 0, y: 0 };
    }
}

export class ComputerPlayer extends Player {
    constructor(name = "AI", gameConnection = Connection.OFFLINE) {
        super(name, gameConnection);
    }

    #getRandomMove(): [number, number] {
        const size = this.board.getGrid().length;
        const x = Math.floor(Math.random() * size);  // Случайные координаты
        const y = Math.floor(Math.random() * size);
        return [x, y];
    }

    // ИИ делает ход
    makeMove(): ICoord {
        const [x, y] = this.#getRandomMove();
        console.log(`${this.name} AI make a move ${x}, ${y}`);
        return { x, y };
    }
}