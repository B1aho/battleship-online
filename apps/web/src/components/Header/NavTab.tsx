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
        <span className="flex text-lg  h-full bg-blue-300">
            {/*Icon && <Icon /> Если mobile то иконки*/}
            <span>{text}</span>
        </span>
    );
}