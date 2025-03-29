import { JSX } from "react";

interface IShipsView {
    ships: JSX.Element[][];
    className?: string;
}

export const ShipsView = ({ ships, className = "" }: IShipsView) => {
    return (
        <div className={"flex flex-col gap-1 " + className} >
            {ships.filter(shipBlocks => shipBlocks.length > 1).map(shipBlocks => {
                return <div className="flex gap-[1px]">
                    {shipBlocks}
                </div>
            })}
            <div className="flex gap-1.5">
                {ships.filter(shipBlocks => shipBlocks.length === 1).map(shipBlocks => {
                    return <div className="flex gap-[1px]">
                        {shipBlocks}
                    </div>
                })}
            </div>
        </div>
    )
}