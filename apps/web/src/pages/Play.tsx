// По сути у нас всегда есть слева (или сверху для моб.вертикал.) доска пользователя, на которой он 
// расставляет корабли до непосредственной игры. Она будет в play всегда. В правой/нижней части гипотетическая доска
// соперника. До выбора режима, здесь будет компонент для выбора режима -> в дальнейшем при переходе на страницу режима
// здесь обновится эта часть на компонент AI доски или online доска

/**
 * Создавать на стрванице play экземпляр GameEventService (или если он синглтон не надо) и передавать его в дочерние
 * компоненты для регистрации подписки на событие удара
 * 
 * Далее каждый дочерний компонент (игрок и оппонент) могут своевременно эмиттить событие хода с нужной информацией, а
 * Противоположный компонент реагировать на этот эмиттить
 * 
 * За предварительную реализацию хода: AiMove() или sendWsMove(), отвечает отдельная функциональность
 */

import { useState } from "react";
import { MoveInfo } from "../features/PlayGame/MoveInfo";
import { OpponentBoard } from "../features/PlayGame/OpponentBoard";
import { SelectMode } from "../features/PlayGame/SelectMode";
import { UserBoard } from "../features/PlayGame/UserBoard";
import { GameMode } from "../game/types";
import { Chat } from "../features/PlayGame/Chat";

export const Play = () => {
    const [selectedMode, setSelectedMode] = useState<"AI" | "ONLINE" | "ROOM" | null>(null);
    const [selectedRules, setSelectedRules] = useState<GameMode>("classic");
    const [currentGameState, setCurrentAction] = useState<"PLACE" | "GAME" | "END">("PLACE");
    return (
        <div className="p-2 flex flex-col">
            <MoveInfo action={currentGameState} />
            <section aria-label="game-area">
                <UserBoard reciveAttak={() => {

                }} />
                <div>
                    {!selectedMode
                        ? <SelectMode />
                        : <OpponentBoard mode={selectedMode} />
                    }
                </div>
            </section>
            {selectedMode !== "AI" && <Chat />}
        </div>
    );
}