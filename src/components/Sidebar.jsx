import {
    LayoutDashboard,
    Receipt,
    CreditCard,
    Settings,
    LogOut,
    X,
} from "lucide-react";
import useStore from "../store/useStore";

export default function Sidebar() {
    const { isSidebarOpen, setSidebarOpen } = useStore();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: Receipt, label: "Transactions", active: false },
        { icon: CreditCard, label: "Cards", active: false },
        { icon: Settings, label: "Settings", active: false },
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
                className={`w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 transition-transform duration-300 z-50 ${
                    isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        FinTrack
                    </h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-slate-400 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                item.active
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                            <item.icon
                                size={20}
                                className={`${
                                    item.active
                                        ? "text-blue-600"
                                        : "text-slate-400 group-hover:text-slate-600"
                                }`}
                            />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
