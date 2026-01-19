import { Menu, Sun, Moon, Plus, Calendar } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

export default function Header() {
    const {
        toggleSidebar,
        user,
        preferences,
        updatePreferences,
        setTransactionModalOpen,
    } = useStore();
    const location = useLocation();
    const navigate = useNavigate();

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

    const formatDate = () => {
        const options = { weekday: "long", month: "short", day: "numeric" };
        return new Date().toLocaleDateString("en-US", options);
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
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar size={14} className="text-blue-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                        {formatDate()}
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {getTitle()}
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setTransactionModalOpen(true)}
                    className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200 dark:shadow-none mr-2 cursor-pointer"
                >
                    <Plus size={20} />
                    <span>Add Transaction</span>
                </button>

                <button
                    onClick={() => setTransactionModalOpen(true)}
                    className="md:hidden p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200"
                >
                    <Plus size={20} />
                </button>

                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 hidden md:block" />

                <button
                    onClick={toggleTheme}
                    className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative cursor-pointer"
                    title={`Switch to ${preferences.theme === "dark" ? "light" : "dark"} mode`}
                >
                    {preferences.theme === "dark" ? (
                        <Sun size={20} />
                    ) : (
                        <Moon size={20} />
                    )}
                </button>

                <div
                    onClick={() => navigate("/settings")}
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-200 dark:shadow-none transition-all cursor-pointer ring-2 ring-transparent hover:ring-blue-100 dark:hover:ring-blue-900/30"
                >
                    {user.name?.[0] || "A"}
                </div>
            </div>
        </header>
    );
}
