import { Ship } from "./ship";

interface ICoord {
    x: number;
    y: number;
}

interface IGameboard {
    receiveAttack: (coord: ICoord) => boolean;
}

// Возможность рандомного размещения кораблей на поле согласно правилам
// Размещение конкретной длины корабля в конкретном месте ,если возможно
// Задание макисмальной длины для кораблей и их максимального количества исходя из размера поля
// Это все выше опсианное в конструкторе 
// Проверка потоплены ли все корабли
// Мониторим промохи
export class Gameboard implements IGameboard {
    #gameboard: boolean[][] = [];
    receiveAttack(coord: ICoord) {
        return true;
    };
}