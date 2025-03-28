import { ICell, ICoord, IGameboard, IPlace, IShip } from "../types";

export interface IGameMode {
    isValidPlace: (placeInfo: IPlace, shipId: number, grid: ICell[][]) => boolean;
    utilityPlace: (place: IPlace, value: null | number, grid: ICell[][]) => void;
    initShips: () => IShip[];
    initBoard: () => ICell[][];
    isValidCoords: (x: number, y: number) => boolean;
    handleAttack: (coord: ICoord, gameboard: IGameboard) => string;
}

/**
 * Calssic mode's config
 */
export enum ClassicMode {
    GRID = "classic-grid",
    SIZE = 10,
    MAX_SHIP = 4,
};
