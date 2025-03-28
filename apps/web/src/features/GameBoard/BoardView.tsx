import { ClassicMode } from "@/src/game/types";
import { ReactElement } from "react";

interface IBroadViewProps {
    cells: ReactElement[];
}

export const BoardView = ({ cells }: IBroadViewProps) => {
    return (
        <div>
            <div className={"grid w-fit outline-1 outline-blue-400 " + ClassicMode.GRID}>
                {cells}
            </div>
        </div>
    );
}