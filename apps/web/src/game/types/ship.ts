export interface IShip {
    length: () => number;
    hit: () => void;
    isSunk: () => boolean;
}