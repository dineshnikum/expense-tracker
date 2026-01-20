import ActivityChart from "../components/ActivityChart";
import CategoryPieChart from "../components/CategoryPieChart";
import TrendChart from "../components/TrendChart";
import SavingsTrendChart from "../components/SavingsTrendChart";
import CategoryBarChart from "../components/CategoryBarChart";
import { PieChart, TrendingUp, Target, ArrowRight } from "lucide-react";
import useStore, { getCurrencySymbol } from "../store/useStore";
import { useMemo } from "react";

export default function Analytics() {
    const { transactions, preferences, monthlyBudget } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);

    const metrics = useMemo(() => {
        const totalIncome = transactions
            .filter((tx) => tx.type === "income")
            .reduce((sum, tx) => sum + tx.amount, 0);
        const totalExpense = transactions
            .filter((tx) => tx.type === "expense")
            .reduce((sum, tx) => sum + tx.amount, 0);

        const savingsRate =
            totalIncome > 0
                ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
                : 0;

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const monthlyExpenses = transactions
            .filter((tx) => {
                const d = new Date(tx.date);
                return (
                    tx.type === "expense" &&
                    d.getMonth() === currentMonth &&
                    d.getFullYear() === currentYear
                );
            })
            .reduce((sum, tx) => sum + tx.amount, 0);

        const dailyAverage = totalExpense / 30;

        return {
            savingsRate,
            monthlyExpenses,
            dailyAverage,
        };
    }, [transactions]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-all hover:scale-[1.02]">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            Savings Rate
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {metrics.savingsRate}%
                        </h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-all hover:scale-[1.02]">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                        <PieChart size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            Budget Used
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {currencySymbol}
                            {metrics.monthlyExpenses.toLocaleString()} /{" "}
                            {currencySymbol}
                            {(monthlyBudget / 1000).toFixed(0)}k
                        </h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-all hover:scale-[1.02]">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                        <Target size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            Daily Average
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {currencySymbol}
                            {metrics.dailyAverage.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                            })}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Main Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TrendChart />
                <SavingsTrendChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ActivityChart />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">
                            Category Distribution
                        </h3>
                        <PieChart size={18} className="text-slate-400" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <CategoryPieChart />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1">
                <CategoryBarChart />
            </div>
        </div>
    );
}
