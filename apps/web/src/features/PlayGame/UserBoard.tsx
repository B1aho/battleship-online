/**
 * Доска пользователя бывает в двух состояниях - редактируемое и играбельное
 * В редактируемом мы можем перетаскивать корабли, очищать доску и расставлять рандомно (пока с последним работаем)
 * В играбельном состоянии мы не можем ничего делать в классическом режиме
 * Нельзя начать играть пока не  все корабли расставлены
 * 
 * В родительском компоненте будет функция которая подписана на событие удара и передает удар в эту доску
 * 
 */

import { Gameboard } from "@/src/game/Gameboard"
import { ShipsView } from "../GameBoard/ShipsView";
import { BoardView } from "../GameBoard/BoardView";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { HitResults, ModeType } from "@/src/game/types";
import { createCells, createShips } from "../GameBoard/utility";
import { gameEventService } from "@/src/game/GameEventService";

export const UserBoard = () => {
    const gameboard = useMemo(() => {
        const board = new Gameboard();
        board.placeRandom();
        return board;
    }, []);

    const [grid, setGrid] = useState(gameboard.getGrid());
    const [ships, setShips] = useState(gameboard.getShips());
    const { SIZE, GRID } = ModeType[gameboard.getMode()];

    useEffect(() => {
        // Подписываемся на события выстрелов
        gameEventService.subscribe((event: ShotEvent) => {
            // Обработка события: обновляем доску
            setBoard(prevBoard => {
                const newBoard = [...prevBoard]; // Создаем копию или делаем глубокое копирование, если нужно
                // Логика обработки попадания по newBoard на координатах event.x, event.y
                // Например, newBoard[event.y][event.x].isHit = true;
                return newBoard;
            });
        });

        return () => {
            gameEventService.unsubscribe();
        };
    }, []);

    const attackFn = useCallback((x: number, y: number) => {
        const attackResult = gameboard.receiveAttack({ x, y });
        if (attackResult === HitResults.SUNK || attackResult === HitResults.GAMEOVER)
            setShips(gameboard.getShips().map(ship => ship));
        if (attackResult === HitResults.GAMEOVER)
            console.log("GAME OVER")
        setGrid(gameboard.getGrid().map(row => [...row]));
    }, [gameboard]);

    const cells: ReactElement[] = useMemo(() => {
        return createCells(grid, attackFn);
    }, [grid, attackFn]);

    const shipBlocks: ReactElement[][] = useMemo(() => {
        return createShips(ships);
    }, [ships]);

    return <div className="relative flex">
        <ShipsView ships={shipBlocks} className="relative top-10" />
        <BoardView cells={cells} gridType={GRID} gridSize={SIZE} />
    </div>
}