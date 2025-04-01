import { Outlet } from "react-router";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer";

export const Layout = () => {
    return (
        <div className="w-full h-full">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
};
