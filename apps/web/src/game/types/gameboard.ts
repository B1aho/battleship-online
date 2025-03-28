import { IShip } from "../types";

export type GameMode = "classic" | "other";

export interface ICoord {
    x: number;
    y: number;
}

export interface IPlace {
    start: ICoord;
    end: ICoord;
    direction: Direction;
}

export interface ICell {
    shipId: number | null;
    isHit: boolean;
}

export type Direction = "horizontal" | "vertical";

export interface IGameboard {
    getGrid: () => ICell[][];
    getShips: () => IShip[];
    getMode: () => GameMode;
    receiveAttack: (coord: ICoord) => string;
    placeShip: (coord: ICoord, shipId: number, direction: Direction) => boolean;
    incrementSunk: () => void;
    checkAllSunk: () => boolean;
}
