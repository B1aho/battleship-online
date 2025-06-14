import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonEn from "./locales/en/common.json";
import navEn from "./locales/en/nav.json";
import commonRu from "./locales/ru/common.json";
import navRu from "./locales/ru/nav.json";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                common: commonEn,
                nav: navEn,
            },
            ru: {
                common: commonRu,
                nav: navRu,
            },
        },
        ns: ["nav", "common"],
        fallbackLng: "en",
    })