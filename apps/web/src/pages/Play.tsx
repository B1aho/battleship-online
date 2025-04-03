// По сути у нас всегда есть слева (или сверху для моб.вертикал.) доска пользователя, на которой он 
// расставляет корабли до непосредственной игры. Она будет в play всегда. В правой/нижней части гипотетическая доска
// соперника. До выбора режима, здесь будет компонент для выбора режима -> в дальнейшем при переходе на страницу режима
// здесь обновится эта часть на компонент AI доски или online доска

import { useState } from "react";
import { MoveInfo } from "../features/PlayGame/MoveInfo";
import { OpponentBoard } from "../features/PlayGame/OpponentBoard";
import { SelectMode } from "../features/PlayGame/SelectMode";
import { UserBoard } from "../features/PlayGame/UserBoard";

export const Play = () => {
    const [selectedMode, setSelectedMode] = useState(null);
    return (
        <div>
            <MoveInfo />
            <div>
                <UserBoard />
                <div>
                    {!selectedMode
                        ? <SelectMode />
                        : <OpponentBoard mode={selectedMode} />
                    }
                </div>
            </div>
        </div>
    );
}