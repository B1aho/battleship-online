import { ReactElement } from "react";

interface IBroadViewProps {
    cells: ReactElement[];
    gridType: string;
}

export const BoardView = ({ cells, gridType }: IBroadViewProps) => {
    return (
        <div>
            <div className={
                "grid w-fit outline-1 outline-blue-400 " + gridType
            }>
                {cells}
            </div>
        </div>
    );
}