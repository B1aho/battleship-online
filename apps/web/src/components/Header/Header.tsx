import { Ship } from "lucide-react";
import { NavLink } from "react-router";
import { NavTab } from "./NavTab";
import { createRef, RefObject, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLinks } from "./links";
// Fix import
import { useIsMobile } from "../../../../../packages/ui/src/hooks/useIsMobile";
import { useTranslation } from "react-i18next";

export const Header = () => {
    const { t } = useTranslation("common");
    const links = useLinks();
    // Reference to the marker that highlighting the active tab
    const markerRef = useRef<HTMLDivElement>(null);
    // Mutable array of refs that refers to NavLinks elements
    const linkRefs = useRef<RefObject<HTMLAnchorElement | null>[]>([]);
    // Active NavLink
    const [anchor, setAnchor] = useState<HTMLAnchorElement | null | undefined>(null);
    const [anchorText, setAnchorText] = useState<string>("");
    // Flag disabling transition on the first position setup
    const [disableTransition, setDisableTransition] = useState(true);
    const isMobile = useIsMobile();

    linkRefs.current = useMemo(
        () => links.map(() => createRef<HTMLAnchorElement>()),
        [links]
    );
    // Move marker to the current active NavLink
    useLayoutEffect(() => {
        const updateMarker = () => {
            if (anchor && markerRef.current) {
                // Disable animation on the first mount
                markerRef.current.style.transition = disableTransition
                    ? "none"
                    : "left 400ms ease-in-out, width 400ms ease-in-out";

                // Move along the X-axis to the active tab
                markerRef.current.style.left = `${anchor.getBoundingClientRect().left + (anchor.getBoundingClientRect().width / 2)}px`;

                // Center along the Y-axis
                markerRef.current.style.top = `${anchor.offsetTop + anchor.offsetHeight / 2}px`;
                markerRef.current.style.transform = "translateY(-110%)"; // Центрируем

                markerRef.current.style.opacity = "1";
                // Enable transition after the first position calculation
                if (disableTransition) {
                    setDisableTransition(false);
                }
            };
        };

        // Update marker position on window resize
        window.addEventListener("resize", updateMarker);
        // Set the marker on mount
        updateMarker();

        // Cleanup the event handler
        return () => window.removeEventListener("resize", updateMarker);
    }, [anchor, disableTransition]);

    return (
        <nav className="flex justify-center w-full h-[8rem] gap-2 relative items-center bg-gray-900 px-2 select-none text-white">
            {!isMobile &&
                <span className="flex gap-1 text-2xl justify-center items-center mr-4 z-10">
                    <Ship size={40} />
                    <span className="font-bold">
                        {t("logo")}
                    </span>
                </span>}
            <ul className={"nav-container " + (isMobile ? "w-[90%]" : "w-[80%]")}>
                {
                    links.map((link, idx) => {
                        return (
                            <li key={`LI-${idx}`} className="list-none text-lg w-[20%] h-full">
                                <NavLink className="flex justify-center items-center text-gray-500 z-10 group h-full relative" to={link.to} ref={linkRefs.current[idx]} key={link.key}>
                                    {({ isActive }) => {
                                        return (
                                            <NavTab
                                                text={link.text}
                                                Icon={link.Icon ? link.Icon : undefined}
                                                isActive={isActive}
                                                setAnchor={() => {
                                                    setAnchor(linkRefs.current[idx]?.current);
                                                    console.log(links[idx]?.text);
                                                    setAnchorText(links[idx]?.text ?? "");
                                                }}
                                            />
                                        );
                                    }}
                                </NavLink>
                            </li>
                        );
                    })
                }
                <div
                    className="nav-marker"
                    ref={markerRef}
                    id="marker"
                >
                    <span className={
                        "nav-marker-label " + (anchorText.length <= 7 ? " w-[4.8rem]" : " w-[6.5rem]")
                    }>
                    </span>
                </div>
            </ul>
        </nav>
    );
}