import { Ship } from "./ship";

type GameMode = "classic" | "other";

interface ICoord {
    x: number;
    y: number;
}

export interface ICell {
    shipId: number | null;
    isHit: boolean;
}

interface IGameboard {
    getBoard: () => ICell[][] | null;
    receiveAttack: (coord: ICoord) => boolean;
}

// Возможность рандомного размещения кораблей на поле согласно правилам
// Размещение конкретной длины корабля в конкретном месте ,если возможно,
// Задание макисмальной длины для кораблей и их максимального количества исходя из размера поля
// Это все выше опсианное в конструкторе 
// Проверка потоплены ли все корабли
// Мониторим промохи
export class Gameboard implements IGameboard {
    #board: ICell[][] | null = null;
    #ships: Ship[] | null = null;
    constructor(gameMode: GameMode = "classic", size = 10) {
        if (size < 0) throw new Error("Size can't be negative");
        this.#initBoard(size);
    }

    getBoard() {
        return this.#board;
    }

    #initBoard(size: number) {
        this.#board = Array.from({ length: size });
        this.#board.forEach((_, idx) => {
            const row: ICell[] = Array.from({ length: size });
            row.fill({ isHit: false, shipId: null })
            if (this.#board) this.#board[idx] = row;
        })
    }

    receiveAttack(coord: ICoord) {
        return true;
    };
}