import { Ship } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

export const Header = () => {
    const { t } = useTranslation("nav");
    const activeLink = "";
    return (
        <nav className="flex w-full">
            <Ship />
            {/* Передаем в hover item локализованную спомощью t строку! Или делаем четыре кнопки на основе ховер
            Вообще лучше назвать hoverButton, если кнопка */}
            <NavLink
                to="home"
                className={({ isActive }) => (isActive ? activeLink : "")} >
                {t("play")}
            </NavLink>
            <NavLink
                to="room"
                className={({ isActive }) => (isActive ? activeLink : "")} >
                {t("create")}
            </NavLink>
        </nav>
    );
}