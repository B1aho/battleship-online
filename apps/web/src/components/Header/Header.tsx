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
                    : "left 300ms ease-in-out, width 300ms ease-in-out";

                markerRef.current.style.left = `${anchor.offsetLeft}px`;
                markerRef.current.style.width = `${anchor.offsetWidth}px`;

                // Центрируем по оси Y
                markerRef.current.style.top = `${anchor.offsetTop + anchor.offsetHeight / 2}px`;
                markerRef.current.style.transform = "translateY(-90%)"; // Центрируем

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
        <nav className="flex w-full h-[6rem] gap-2 relative items-center header-bg px-2 select-none">
            <span className="flex text-2xl justify-center items-center mr-4 z-10">
                <Ship width={55} />
                <span>{t("logo")}</span>
            </span>
            <ul className="flex items-center w-full h-full">
                {
                    links.map((link, idx) => {
                        return (
                            <li className="list-none text-lg w-[20%] h-full bg-blue-300">
                                <NavLink className="z-10 h-full relative" to={link.to} ref={linkRefs.current[idx]} key={link.key}>
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
                    className="absolute opacity-0 top-[20%] z-[1] w-11 h-14 before:content-[''] before:absolute before:top-[20%] before:left-[50%] before:-translate-x-1/2 before:w-[40px] before:h-10 before:rounded-[8px] before:bg-white before:shadow-[0_0_0_10px_rgb(255,255,255),0_0_20px_rgb(255,255,255),0_0_40px_#fff,0_0_80px_#fff,0_0_160px_rgb(58,134,255)]"
                    ref={markerRef}
                    id="marker">
                </div>
            </ul>
        </nav>
    );
}