import {
    LayoutDashboard,
    Receipt,
    LineChart,
    Settings,
    LogOut,
    X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import useStore from "../store/useStore";

export default function Sidebar() {
    const { isSidebarOpen, setSidebarOpen } = useStore();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        { icon: Receipt, label: "Transactions", path: "/transactions" },
        { icon: LineChart, label: "Analytics", path: "/analytics" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-screen fixed left-0 top-0 transition-all duration-300 z-50 ${
                    isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        FinTrack
                    </h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                    isActive
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon
                                        size={20}
                                        className={`${
                                            isActive
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                                        }`}
                                    />
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => {
                            if (
                                confirm(
                                    "Are you sure you want to sign out and clear all data?",
                                )
                            ) {
                                useStore.getState().clearTransactions();
                            }
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
