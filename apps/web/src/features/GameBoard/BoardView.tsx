import { ICell } from "@/src/game/types";
import { ReactElement } from "react";

interface IBroadViewProps {
    grid: ICell[][];
}

// В types перенси и  использую везде его
enum GridSize {
    CLASSIC_GRID = "classic-grid",
    CLASSIC_SIZE = 10
}

export const BoardView = ({ grid }: IBroadViewProps) => {
    const cells: ReactElement[] = [];
    for (let i = 0; i < GridSize.CLASSIC_SIZE; i++) {
        for (let j = 0; j < GridSize.CLASSIC_SIZE; j++) {
            const { shipId, isHit } = grid[i]![j]!;
            let symbol = " ";
            switch (true) {
                case (!!shipId && isHit):
                    symbol = "x";
                    break;
                case (!!shipId):
                    symbol = "#";
                    break;
                case (isHit):
                    symbol = "0";
                    break;
                default:
                    break;
            }
            cells.push(<div className="w-full text-center outline-1">{`${i}:${j}`}</div>);
        }
    }
    return (
        <div className={"grid aspect-square outline-1 outline-blue-400 " + GridSize.CLASSIC_GRID}>
            {cells}
        </div>
    );
}