import { Bell, Search, Menu, Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";
import useStore from "../store/useStore";

export default function Header() {
    const { toggleSidebar, user, preferences, updatePreferences } = useStore();
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case "/":
                return "Dashboard";
            case "/transactions":
                return "Transactions";
            case "/analytics":
                return "Analytics";
            case "/settings":
                return "Settings";
            default:
                return "FinTrack";
        }
    };

    const toggleTheme = () => {
        updatePreferences({
            theme: preferences.theme === "dark" ? "light" : "dark",
        });
    };

    return (
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700 px-8 py-5 flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-4 md:hidden">
                <button
                    onClick={() => toggleSidebar()}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border dark:border-slate-700 p-1 rounded-lg"
                >
                    <span className="sr-only">Menu</span>
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    FinTrack
                </h1>
            </div>

            <div className="hidden md:block">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {getTitle()}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Welcome back, {user.name.split(" ")[0]}!
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900 transition-all">
                    <Search
                        size={18}
                        className="text-slate-400 dark:text-slate-500"
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none ml-2 text-sm w-48 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
                    />
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
                    title={`Switch to ${preferences.theme === "dark" ? "light" : "dark"} mode`}
                >
                    {preferences.theme === "dark" ? (
                        <Sun size={20} />
                    ) : (
                        <Moon size={20} />
                    )}
                </button>

                <button className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-200 dark:shadow-none transition-all">
                    {user.name?.[0] || "A"}
                </div>
            </div>
        </header>
    );
}
