import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, useEffect } from "react";

interface INavTab {
    text: string;
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    isActive: boolean;
    setAnchor: () => void;
}

export const NavTab = ({ text, isActive, setAnchor, Icon }: INavTab) => {
    useEffect(() => {
        if (isActive) setAnchor();
    }, [isActive, setAnchor]);

    return (
        <>
            {Icon && <Icon size={34} className={"z-10 flex-1 w-full transition-all duration-300 group-hover:text-(--light-yellow) group-hover:drop-shadow-[0_0px_9px_rgb(252,211,77)] " + (isActive ? " text-(--light-yellow) drop-shadow-[0_0px_9px_rgb(252,211,77)] -translate-y-8" : "")} />}
            <span className="absolute opacity-0 h-full w-full text-center">{text}</span>
        </>
    );
}