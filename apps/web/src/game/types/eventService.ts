import { ICoord } from "./gameboard";

export type Obesrver = (event: IMoveInfo) => void;

export interface IMoveInfo extends ICoord {
    hitter: string;
}