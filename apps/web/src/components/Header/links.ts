import { Cable, LucideProps, Play } from "lucide-react";
import { ForwardRefExoticComponent } from "react";
import { useTranslation } from "react-i18next";

export interface ILink {
    to: string;
    text: string;
    key: string;
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
}

export const useLinks = (): ILink[] => {
    const { t } = useTranslation("nav");
    return ([
        {
            key: "L-0",
            to: "play",
            Icon: Play,
            text: t("nav:play"),
        },
        {
            key: "L-1",
            to: "room",
            Icon: Cable,
            text: t("nav:create"),
        }
    ]);
};