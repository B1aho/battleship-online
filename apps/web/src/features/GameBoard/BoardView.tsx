import { ReactElement } from "react";

interface IBroadViewProps {
    cells: ReactElement[];
    gridType: string;
    gridSize: number;
}

export const BoardView = ({ cells, gridType, gridSize }: IBroadViewProps) => {
    return (
        <div className="grid grid-board select-none">
            <div className="grid one-row col-start-2">
                {Array.from({ length: gridSize }).map((_, idx) => {
                    return (
                        <div key={`A-${idx}`} className="w-full text-center">
                            {idx}
                        </div>)
                })}
            </div>
            <div className="grid one-column row-start-2">
                {Array.from({ length: gridSize }).map((_, idx) => {
                    return (
                        <div key={`N-${idx}`} className="w-full text-center">
                            {String.fromCharCode('A'.charCodeAt(0) + idx)}
                        </div>)
                })}
            </div>
            <div className={
                "col-start-2 row-start-2 grid w-fit outline-1 outline-blue-400 " + gridType
            }>
                {cells}
            </div>
        </div>
    );
}