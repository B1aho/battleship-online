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
import { GameEvent, GameMode, IMoveInfo, IMoveResultInfo, isMoveResult, ModeType } from "@/src/game/types";
import { createCells, createShips } from "../GameBoard/utility";
import { GameEventService } from "@/src/game/GameEventService";

interface IUserBoard {
    eventService: GameEventService;
    gameMode?: GameMode;
    gameboard: Gameboard;
    connectionLayer: any;
}

export const UserBoard = ({ eventService, gameboard, connectionLayer }: IUserBoard) => {

    const name = "User";
    const [grid, setGrid] = useState(gameboard.getGrid());
    const [ships, setShips] = useState(gameboard.getShips());
    const { SIZE, GRID } = ModeType[gameboard.getMode()];

    const handleMove = useCallback((event: IMoveInfo) => {
        const { x, y, hitter } = event;
        // Будет имя игрока брать из Redux состояния - либо анон№213213 либо никнейм уникальный
        // Или просто handleMove рабоатает, если компонент служит userBoard
        // И handleMoveResult работает, если компонент служит opponentBoard
        if (hitter === name)
            return;
        const attackResult = gameboard.receiveAttack({ x, y });
        setShips(gameboard.getShips().map(ship => ship));
        setGrid(gameboard.getGrid().map(row => [...row]));
        connectionLayer.emit(attackResult);

    }, [gameboard, connectionLayer]);

    // Принимаем результат и отражаем его на доске. Выполняется на доске оппонента
    const handleMoveResult = useCallback((event: IMoveResultInfo) => {
        const { hitter } = event;
        if (hitter !== name)
            return;
        setShips(gameboard.getShips().map(ship => ship));
        setGrid(gameboard.getGrid().map(row => [...row]));
    }, [gameboard]);

    const handleGameEvent = useCallback((event: GameEvent) => {
        // Разветвляем на два заранее определенных обработчика - один
        // Обрабатывает если тип событие MoveInfo,  другой если тип события MoveInfoResult
        if (isMoveResult(event)) {
            handleMoveResult(event);
        } else {
            handleMove(event);
        }
    }, [handleMove, handleMoveResult]);

    // Изменить на регистрацию под медиаатор
    useEffect(() => {
        // Subscribe on all game events
        eventService.subscribe(handleGameEvent);

        // Clean subscriptionwhen unmount
        return () => {
            eventService.unsubscribe(handleGameEvent);
        };
    }, [handleGameEvent, eventService]);

    const cells: ReactElement[] = useMemo(() => {
        return createCells(grid);
    }, [grid]);

    const shipBlocks: ReactElement[][] = useMemo(() => {
        return createShips(ships);
    }, [ships]);

    return <div className="relative flex">
        <ShipsView ships={shipBlocks} className="relative top-10" />
        <BoardView cells={cells} gridType={GRID} gridSize={SIZE} />
    </div>
}