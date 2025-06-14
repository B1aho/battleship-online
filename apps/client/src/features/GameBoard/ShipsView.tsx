import { JSX } from "react";

interface IShipsView {
    ships: JSX.Element[][];
    className?: string;
}

export const ShipsView = ({ ships, className = "" }: IShipsView) => {
    return (
        <div className={"flex flex-col gap-1 " + className} >
            {ships.filter(shipBlocks => shipBlocks.length > 1).map((shipBlocks, idx) => {
                return <div key={`SH-${idx}`} className="flex gap-[1px]">
                    {shipBlocks}
                </div>
            })}
            <div className="flex gap-1.5">
                {ships.filter(shipBlocks => shipBlocks.length === 1).map((shipBlocks, idx) => {
                    return <div key={`SHI-${idx}`} className="flex gap-[1px]">
                        {shipBlocks}
                    </div>
                })}
            </div>
        </div>
    )
}