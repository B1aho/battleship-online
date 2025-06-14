// Сейчас Observer - переделываем под mediator

import { GameEvent, IGameboard, Obesrver } from "./types/index.js";

/**
 * Интерфейс Посредника предоставляет метод, используемый компонентами для
 * уведомления посредника о различных событиях. Посредник может реагировать на
 * эти события и передавать исполнение другим компонентам.
 */
interface Mediator {
    notify(sender: object, event: string): void;
}

export class GameMediator implements Mediator {
    #boards: IGameboard[] = [];

    register(board: IGameboard) {
        this.#boards.push(board);
        board.setMediator(this);
    }

    unregister(board: IGameboard) {
        this.#boards = this.#boards.filter(b => b !== board);
        board.setMediator(null);
    }

    notify(sender: IGameboard, event: string): void {
        // Получатели события все кто не sender
        const recievers = this.#boards.filter(board => board !== sender);
        recievers.forEach(reviever => reciever.handleEvent(event));
    }
}


export class GameEventService {
    #observers: Obesrver[] = [];

    subscribe(func: Obesrver) {
        this.#observers.push(func);
    }

    unsubscribe(func: Obesrver) {
        this.#observers = this.#observers.filter((observer) => observer !== func);
    }

    emit(event: GameEvent) {
        this.#observers.forEach((observer) => observer(event));
    }
}

export const gameEventService = new GameEventService();