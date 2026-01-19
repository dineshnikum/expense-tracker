import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import Sidebar from "./Sidebar";
import StatsCard from "./StatsCard";
import TransactionList from "./TransactionList";
import ExpenseForm from "./ExpenseForm";
import SavingsGoal from "./SavingsGoal";
import Header from "./Header";
import ActivityChart from "./ActivityChart";
import useStore from "../store/useStore";

export default function Dashboard() {
    const { isSidebarOpen, setSidebarOpen } = useStore();

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="flex-1 md:ml-64 transition-all duration-300">
                <Header />

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
                            <ActivityChart />
                            <TransactionList />
                        </div>
                        <div className="space-y-8">
                            <ExpenseForm />
                            <SavingsGoal />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
