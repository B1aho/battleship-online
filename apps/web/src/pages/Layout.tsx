import { Outlet } from "react-router";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { ArrowBigDownDash } from "lucide-react";

export const Layout = () => {
    const [isHeaderHidden, setIsHeaderHidden] = useState(false);
    return (
        <>
            <div className="sticky top-0">
                <section className={
                    "overflow-hidden w-full transition-[max-height,opacity] duration-400 ease-in-out "
                    + (isHeaderHidden ? "max-h-0 opacity-50" : "max-h-[400px] opacity-100")
                }>
                    <Header />
                </section>
                <div
                    aria-label="button"
                    className="h-[40px] w-[40px] cursor-pointer bg-white"
                    onPointerUp={() => setIsHeaderHidden(!isHeaderHidden)}
                >
                    <ArrowBigDownDash
                        size={40}
                        className={"transition-transform duration-300 " + (isHeaderHidden ? "rotate-0" : "rotate-180")}
                    />
                </div>
            </div>
            <section>
                <Outlet />
            </section>
            <Footer />
        </>
    )
};
