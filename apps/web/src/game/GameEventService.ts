import { IMoveInfo, Obesrver } from "./types";

export class GameEventService {
    #observers: Obesrver[] = [];

    subscribe(func: Obesrver) {
        this.#observers.push(func);
    }

    unsubscribe(func: Obesrver) {
        this.#observers = this.#observers.filter((observer) => observer !== func);
    }

    emit(event: IMoveInfo) {
        this.#observers.forEach((observer) => observer(event));
    }
}

export const gameEventService = new GameEventService();