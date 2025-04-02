import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, useEffect } from "react";

interface INavTab {
    text: string;
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    isActive: boolean;
    setAnchor: () => void;
};

export const NavTab = ({ text, isActive, setAnchor, Icon }: INavTab) => {
    useEffect(() => {
        if (isActive) setAnchor();
    }, [isActive, setAnchor]);

    const iconClass = "z-10 flex-1 w-full transition-all duration-400 group-hover:text-(--light-yellow) group-hover:drop-shadow-[0_0px_9px_rgb(252,211,77)] ";
    const activeIconClass = "text-(--light-yellow) drop-shadow-[0_0px_9px_rgb(252,211,77)] -translate-y-[30px]";
    const linkTextClass = "absolute pointer-events-none uppercase text-(--light-yellow) opacity-0 h-full w-full transition-all duration-400 text-center font-medium text-[0.9rem] top-[4px] translate-y-[60px] ";
    const activeLinkTextClass = "opacity-100 drop-shadow-[0_0px_9px_rgb(252,211,77)]";
    return (
        <>
            {Icon && <Icon size={34} className={iconClass + (isActive ? activeIconClass : "")} />}
            <span className={linkTextClass + (isActive ? activeLinkTextClass : "")}>{text}</span>
        </>
    );
}