import { Ship } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export const Header = () => {
    const { t } = useTranslation("nav");
    const links = [
        {
            to: "play",
            content: t("play"),
        },
        {
            to: "room",
            content: t("create"),
        }
    ];
    return (
        <nav className="flex w-full">
            <Ship />
            {links.map(link => {
                return <NavLink to={link.to}>{link.content}</NavLink>;
            })}
        </nav>
    );
}