import { Ship } from "lucide-react";
import { NavLink } from "react-router";
import { NavTab } from "./NavTab";
import { createRef, RefObject, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLinks } from "./links";
import { useTranslation } from "react-i18next";



export const Header = () => {
    const { t } = useTranslation("common");
    const links = useLinks();
    const markerRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<RefObject<HTMLAnchorElement | null>[]>([]);
    const [anchor, setAnchor] = useState<HTMLAnchorElement | null | undefined>(null);
    // Флаг, отключающий transition при первой установке позиции
    const [disableTransition, setDisableTransition] = useState(true);

    // Array of refs that refers to NavLinks
    linkRefs.current = useMemo(
        () => links.map(() => createRef<HTMLAnchorElement>()),
        [links]
    );
    // Move marker to the current active NavLink
    useLayoutEffect(() => {
        const updateMarker = () => {
            if (anchor && markerRef.current) {
                // При первом монтировании отключаем анимацию
                markerRef.current.style.transition = disableTransition
                    ? "none"
                    : "left 400ms ease-in-out, width 400ms ease-in-out";

                markerRef.current.style.left = `${anchor.getBoundingClientRect().left + (anchor.getBoundingClientRect().width / 2)}px`;
                //markerRef.current.style.width = `${anchor.offsetWidth}px`;

                // Центрируем по оси Y
                markerRef.current.style.top = `${anchor.offsetTop + anchor.offsetHeight / 2}px`;
                markerRef.current.style.transform = "translateY(-110%)"; // Центрируем

                markerRef.current.style.opacity = "1";
                // После первого вычисления позиций включаем transition
                if (disableTransition) {
                    setDisableTransition(false);
                }
            };
        };

        window.addEventListener("resize", updateMarker);
        updateMarker();

        return () => window.removeEventListener("resize", updateMarker);
    }, [anchor, disableTransition]);

    return (
        <nav className="flex w-full h-[8rem] gap-2 relative items-center bg-gray-900 px-2 select-none text-white">
            <span className="flex gap-1 text-2xl justify-center items-center mr-4 z-10">
                <Ship size={40} />
                <span className="font-bold">{t("logo")}</span>
            </span>
            <ul className="flex items-center w-[80%] h-[60%] rounded-lg bg-gray-800 shadow-black shadow-[inset_0_1px_3px_rgba(0,0,0,0.1),inset_0_-1px_3px_rgba(0,0,0,0.1),inset_1px_0_3px_rgba(0,0,0,0.1),inset_-1px_0_3px_rgba(0,0,0,0.1)]">
                {
                    links.map((link, idx) => {
                        return (
                            <li className="list-none text-lg w-[20%] h-full">
                                <NavLink className="flex items-center text-gray-500 z-10 group h-full relative" to={link.to} ref={linkRefs.current[idx]} key={link.key}>
                                    {({ isActive }) => {
                                        return (
                                            <NavTab
                                                text={link.text}
                                                Icon={link.Icon ? link.Icon : undefined}
                                                isActive={isActive}
                                                setAnchor={() => setAnchor(linkRefs.current[idx]?.current)}
                                            />
                                        );
                                    }}
                                </NavLink>
                            </li>
                        );
                    })
                }
                <div
                    className="absolute opacity-0 top-[20%] left-[50%] -translate-x-1/2 w-[3.6rem] h-[50px] border-t-(--light-yellow) border-t-2 border-l-(--light-yellow) border-l-2 rounded-[15px] bg-(--dark-yellow) shadow-[0_0_0_6px_rgb(17,24,39),0_2px_0_5px_var(--light-yellow)] before:absolute before:top-[28%] before:-left-[32%] before:w-[10px] before:h-[10px] before:bg-transparent before:rounded-tr-lg before:shadow-[3px_-3px_0_2px_rgb(17,24,39)] after:absolute after:top-[28%] after:-right-[29%] after:w-[10px] after:h-[10px] after:bg-transparent after:rounded-tl-lg after:shadow-[-3px_-3px_0px_1px_rgb(17,24,39)]"
                    ref={markerRef}
                    id="marker">
                    <span className="absolute top-[74px] left-[50%] -translate-x-1/2 w-[7rem] h-[30px] bg-(--dark-yellow) rounded-[20px] border-t-(--light-yellow) border-t-2 shadow-[0_0_0_5px_rgb(17,24,39),0_-2px_0_4px_var(--light-yellow)]">
                    </span>
                </div>
            </ul>
        </nav>
    );
}