import {
    Wallet,
    ArrowUpCircle,
    ArrowDownCircle,
    Bell,
    Search,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import StatsCard from "./components/StatsCard";
import TransactionList from "./components/TransactionList";
import ExpenseForm from "./components/ExpenseForm";

export default function App() {
    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            <Sidebar />

            <main className="flex-1 md:ml-64 transition-all duration-300">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4 md:hidden">
                        <button className="text-slate-600 hover:text-slate-900">
                            <span className="sr-only">Menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            FinTrack
                        </h1>
                    </div>

                    <div className="hidden md:block">
                        <h2 className="text-2xl font-bold text-slate-800">
                            Dashboard
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Welcome back, Alex!
                        </p>
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

                {/* Dashboard Content */}
                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                            title="Total Balance"
                            amount={12450.0}
                            icon={Wallet}
                            trend={2.5}
                            color="blue"
                        />
                        <StatsCard
                            title="Total Income"
                            amount={4250.0}
                            icon={ArrowDownCircle}
                            trend={12}
                            color="green"
                        />
                        <StatsCard
                            title="Total Expense"
                            amount={1890.5}
                            icon={ArrowUpCircle}
                            trend={-5}
                            color="red"
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <TransactionList />
                        </div>
                        <div className="space-y-8">
                            <ExpenseForm />

                            {/* Savings Goal Card (Bonus) */}
                            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
                                <h3 className="font-bold text-lg mb-2">
                                    Savings Goal
                                </h3>
                                <p className="text-blue-100 text-sm mb-4">
                                    New Laptop
                                </p>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-3xl font-bold">
                                        $1,200
                                    </span>
                                    <span className="text-blue-200 font-medium">
                                        Target: $2,000
                                    </span>
                                </div>
                                <div className="w-full bg-blue-900/30 rounded-full h-2 mb-4">
                                    <div className="bg-emerald-400 h-2 rounded-full w-[60%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
