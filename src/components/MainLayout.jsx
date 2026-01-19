import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Sidebar />

            <main className="flex-1 md:ml-64 transition-all duration-300">
                <Header />

                {/* Page Content */}
                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
