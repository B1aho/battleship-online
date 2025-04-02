import { Cable, Info, LogIn, LucideGamepad2, LucideProps, UserRoundPen } from "lucide-react";
import { ForwardRefExoticComponent } from "react";
import { useTranslation } from "react-i18next";

export interface ILink {
    to: string;
    text: string;
    key: string;
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
}

export const useLinks = (): ILink[] => {
    const { t } = useTranslation("nav");
    return ([
        {
            key: "L-0",
            to: "play",
            Icon: LucideGamepad2,
            text: t("nav:play"),
        },
        {
            key: "L-1",
            to: "room",
            Icon: Cable,
            text: t("nav:create"),
        },
        {
            key: "L-2",
            to: "about",
            Icon: Info,
            text: t("nav:info"),
        },
        {
            key: "L-3",
            to: "register",
            Icon: UserRoundPen,
            text: t("nav:register"),
        },
        {
            key: "L-4",
            to: "login",
            Icon: LogIn,
            text: t("nav:login"),
        },
    ]);
};