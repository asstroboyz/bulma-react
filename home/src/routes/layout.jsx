import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";

import { Sidebar } from "@/layouts/sidebar";
import { Header } from "@/layouts/header";

import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

const Layout = () => {
    const location = useLocation(); // Mengambil lokasi saat ini
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);

    const sidebarRef = useRef(null);

    // Daftar rute yang tidak membutuhkan sidebar dan header
    const noSidebarRoutes = ["/", "/register"];
    const noHeaderRoutes = ["/", "/register"];

    // Periksa apakah rute saat ini adalah salah satu rute tanpa sidebar
    const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

    // Periksa apakah rute saat ini adalah salah satu rute tanpa header
    const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
                )}
            />
            {/* Sidebar hanya ditampilkan jika shouldShowSidebar bernilai true */}
            {shouldShowSidebar && (
                <Sidebar
                    ref={sidebarRef}
                    collapsed={collapsed}
                />
            )}
            <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
                {/* Header hanya ditampilkan jika shouldShowHeader bernilai true */}
                {shouldShowHeader && (
                    <Header
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    />
                )}
                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
