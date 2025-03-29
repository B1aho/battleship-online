import { GameMode, ICell, ICoord, IGameboard, IPlace, IShip } from "../types";

export interface IGameMode {
    mode: Mode;
    isValidPlace: (placeInfo: IPlace, shipId: number, grid: ICell[][]) => boolean;
    markSurroundedCells: (begin: ICoord, end: ICoord, grid: ICell[][]) => void;
    utilityPlace: (place: IPlace, value: null | number, grid: ICell[][]) => void;
    initShips: () => IShip[];
    initBoard: () => ICell[][];
    isValidCoords: (x: number, y: number) => boolean;
    handleAttack: (coord: ICoord, gameboard: IGameboard) => string;
}

/**
 * Calssic mode's config
 */
export interface Mode {
    GRID: string,
    SIZE: number,
    MAX_SHIP_KIND: number,
};

export const ModeType: Record<GameMode, Mode> = {
    "classic": {
        GRID: "classic-grid",
        SIZE: 10,
        MAX_SHIP_KIND: 4,
    },
    "other": {
        GRID: "other-grid",
        SIZE: 15,
        MAX_SHIP_KIND: 7,
    },
}

export enum HitResults {
    HIT = "Hit",
    GAMEOVER = "Hit. Game over.",
    SUNK = "Hit. Sunk.",
    MISS = "Miss",
    OLD_MOVE = "Move has already been made"
}
