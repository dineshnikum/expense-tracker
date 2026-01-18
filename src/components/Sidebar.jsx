import {
    LayoutDashboard,
    Receipt,
    CreditCard,
    Settings,
    LogOut,
} from "lucide-react";

export default function Sidebar() {
    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: Receipt, label: "Transactions", active: false },
        { icon: CreditCard, label: "Cards", active: false },
        { icon: Settings, label: "Settings", active: false },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-screen fixed left-0 top-0">
            <div className="p-6 border-b border-slate-100">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    FinTrack
                </h1>
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
    );
}
