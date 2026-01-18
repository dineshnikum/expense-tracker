import { Bell, Search, Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4 md:hidden">
                <button
                    onClick={onMenuClick}
                    className="text-slate-600 hover:text-slate-900 border p-1 rounded-lg"
                >
                    <span className="sr-only">Menu</span>
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    FinTrack
                </h1>
            </div>

            <div className="hidden md:block">
                <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
                <p className="text-slate-500 text-sm">Welcome back, Alex!</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center px-4 py-2 bg-slate-100 rounded-xl focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Search size={18} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none ml-2 text-sm w-48 placeholder:text-slate-400"
                    />
                </div>
                <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-200">
                    A
                </div>
            </div>
        </header>
    );
}
