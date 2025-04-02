import { Outlet } from "react-router";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { ArrowBigDownDash } from "lucide-react";

export const Layout = () => {
    const [isHeaderHidden, setIsHeaderHidden] = useState(false);
    return (
        <div className="w-full h-full fixed">
            <section className={"flex flex-col items-center transition-transform duration-400 ease-in-out " + (isHeaderHidden ? "-translate-y-[calc(100%-40px)]" : "translate-y-0")}>
                <Header />
                <div
                    aria-label="button"
                    className="h-[40px] w-[40px] cursor-pointer"
                    onPointerUp={() => setIsHeaderHidden(!isHeaderHidden)}
                >
                    <ArrowBigDownDash
                        size={40}
                        className={"transition-transform duration-300 " + (isHeaderHidden ? "rotate-180" : "rotate-0")}
                    />
                </div>
            </section>
            <Outlet />
            <Footer />
        </div>
    )
};
