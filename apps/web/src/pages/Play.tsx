// По сути у нас всегда есть слева (или сверху для моб.вертикал.) доска пользователя, на которой он 
// расставляет корабли до непосредственной игры. Она будет в play всегда. В правой/нижней части гипотетическая доска
// соперника. До выбора режима, здесь будет компонент для выбора режима -> в дальнейшем при переходе на страницу режима
// здесь обновится эта часть на компонент AI доски или online доска

import { useState } from "react";
import { MoveInfo } from "../features/PlayGame/MoveInfo";
import { OpponentBoard } from "../features/PlayGame/OpponentBoard";
import { SelectMode } from "../features/PlayGame/SelectMode";
import { UserBoard } from "../features/PlayGame/UserBoard";
import { GameMode, IMove } from "../game/types";
import { Chat } from "../features/PlayGame/Chat";

export const Play = () => {
    const [selectedMode, setSelectedMode] = useState<"AI" | "ONLINE" | "ROOM" | null>(null);
    const [selectedRules, setSelectedRules] = useState<GameMode>("classic");
    const [currentAction, setCurrentAction] = useState<IMove | null>(null);
    return (
        <div className="p-2 flex flex-col">
            <MoveInfo action={currentAction} />
            <section aria-label="game-area">
                <UserBoard />
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