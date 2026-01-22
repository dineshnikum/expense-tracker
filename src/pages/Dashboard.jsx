import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import StatsCard from "../components/StatsCard";
import TransactionList from "../components/TransactionList";
import SavingsGoal from "../components/SavingsGoal";
import ActivityChart from "../components/ActivityChart";
import FinancialHealth from "../components/FinancialHealth";
import useStore from "../store/useStore";

export default function Dashboard() {
    const { transactions } = useStore();

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear =
        currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthTransactions = transactions.filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const previousMonthTransactions = transactions.filter((t) => {
        const d = new Date(t.date);
        return (
            d.getMonth() === previousMonth &&
            d.getFullYear() === previousMonthYear
        );
    });

    const calculateTotals = (txs) => {
        const income = txs
            .filter((t) => t.type === "income")
            .reduce((acc, t) => acc + t.amount, 0);
        const expense = txs
            .filter((t) => t.type === "expense")
            .reduce((acc, t) => acc + t.amount, 0);
        return { income, expense, balance: income - expense };
    };

    const currentTotals = calculateTotals(currentMonthTransactions);
    const previousTotals = calculateTotals(previousMonthTransactions);

    const totalBalance = transactions.reduce((acc, t) => {
        return t.type === "income" ? acc + t.amount : acc - t.amount;
    }, 0);

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const calculateTrend = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return Number(((current - previous) / previous) * 100).toFixed(1);
    };

    const balanceTrend = calculateTrend(
        totalBalance,
        totalBalance - currentTotals.balance,
    );
    const incomeTrend = calculateTrend(
        currentTotals.income,
        previousTotals.income,
    );
    const expenseTrend = calculateTrend(
        currentTotals.expense,
        previousTotals.expense,
    );

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Balance"
                    amount={totalBalance}
                    icon={Wallet}
                    trend={balanceTrend}
                    color="blue"
                />
                <StatsCard
                    title="Total Income"
                    amount={totalIncome}
                    icon={ArrowDownCircle}
                    trend={incomeTrend}
                    color="green"
                />
                <StatsCard
                    title="Total Expense"
                    amount={totalExpense}
                    icon={ArrowUpCircle}
                    trend={expenseTrend}
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
