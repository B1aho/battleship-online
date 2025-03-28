import { ReactElement } from "react";

interface IBroadViewProps {
    cells: ReactElement[];
}

// В types перенси и  использую везде его
enum GridSize {
    CLASSIC_GRID = "classic-grid",
    CLASSIC_SIZE = 10
}

export const BoardView = ({ cells }: IBroadViewProps) => {
    return (
        <div>
            <div className={"grid w-fit outline-1 outline-blue-400 " + GridSize.CLASSIC_GRID}>
                {cells}
            </div>
        </div>
    );
}