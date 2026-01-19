import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import StatsCard from "../components/StatsCard";
import TransactionList from "../components/TransactionList";
import SavingsGoal from "../components/SavingsGoal";
import ActivityChart from "../components/ActivityChart";
import FinancialHealth from "../components/FinancialHealth";

export default function Dashboard() {
    return (
        <div className="space-y-8">
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
                    <SavingsGoal />
                    <FinancialHealth />
                </div>
            </div>
        </div>
    );
}
