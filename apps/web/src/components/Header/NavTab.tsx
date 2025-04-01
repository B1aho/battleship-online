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
            {Icon && <Icon size={30} className={"z-10 flex-1 w-full transition-all duration-300 hover:text-amber-300 hover:shadow-amber-300 " + (isActive ? "text-amber-300 shadow-amber-300 -translate-y-5" : "")} />}
            <span className="absolute opacity-0 h-full w-full text-center">{text}</span>
        </>
    );
}