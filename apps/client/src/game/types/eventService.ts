import { ICoord } from "./gameboard.js";
import { HitResults } from "./gamemode.js";

export type Obesrver = (event: GameEvent) => void;

export interface IMoveInfo extends ICoord {
    hitter: string;
}

export interface IMoveResultInfo extends IMoveInfo {
    result: HitResults;
}

// Add type guards
export function isMoveResult(event: GameEvent): event is IMoveResultInfo {
    return (event as IMoveResultInfo).result !== undefined;
}

export type GameEvent = IMoveInfo | IMoveResultInfo;