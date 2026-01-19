import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import StatsCard from "../components/StatsCard";
import TransactionList from "../components/TransactionList";
import SavingsGoal from "../components/SavingsGoal";
import ActivityChart from "../components/ActivityChart";
import FinancialHealth from "../components/FinancialHealth";
import useStore from "../store/useStore";

export default function Dashboard() {
    const { transactions } = useStore();

    const totalBalance = transactions.reduce((acc, transaction) => {
        if (transaction.type === "income") {
            return acc + transaction.amount;
        } else {
            return acc - transaction.amount;
        }
    }, 0);

    const totalIncome = transactions.reduce((acc, transaction) => {
        if (transaction.type === "income") {
            return acc + transaction.amount;
        } else {
            return acc;
        }
    }, 0);

    const totalExpense = transactions.reduce((acc, transaction) => {
        if (transaction.type === "expense") {
            return acc + transaction.amount;
        } else {
            return acc;
        }
    }, 0);

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Balance"
                    amount={totalBalance}
                    icon={Wallet}
                    trend={2.5}
                    color="blue"
                />
                <StatsCard
                    title="Total Income"
                    amount={totalIncome}
                    icon={ArrowDownCircle}
                    trend={12}
                    color="green"
                />
                <StatsCard
                    title="Total Expense"
                    amount={totalExpense}
                    icon={ArrowUpCircle}
                    trend={-5}
                    color="red"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <ActivityChart />
                    <TransactionList
                        transactions={[...transactions].reverse().slice(0, 5)}
                    />
                </div>
                <div className="space-y-8">
                    <SavingsGoal />
                    <FinancialHealth />
                </div>
            </div>
        </div>
    );
}
