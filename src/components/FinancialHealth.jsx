import { Target, TrendingUp, Edit2, Check, X, AlertCircle } from "lucide-react";
import useStore, { getCurrencySymbol } from "../store/useStore";
import { useState } from "react";

export default function FinancialHealth() {
    const { transactions, preferences, monthlyBudget, updateMonthlyBudget } =
        useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);
    const [isEditing, setIsEditing] = useState(false);
    const [tempBudget, setTempBudget] = useState(monthlyBudget);

    // Calculate this month's expenses
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = transactions
        .filter((tx) => {
            const txDate = new Date(tx.date);
            return (
                tx.type === "expense" &&
                txDate.getMonth() === currentMonth &&
                txDate.getFullYear() === currentYear
            );
        })
        .reduce((sum, tx) => sum + tx.amount, 0);

    const progress = Math.min(
        Math.round((monthlyExpenses / monthlyBudget) * 100),
        100,
    );

    const isOverBudget = monthlyExpenses > monthlyBudget;

    const handleSave = () => {
        updateMonthlyBudget(Number(tempBudget));
        setIsEditing(false);
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-all duration-300 relative group">
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Target
                        size={18}
                        className={
                            isOverBudget ? "text-rose-500" : "text-blue-500"
                        }
                    />
                    Financial Health
                </h3>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Edit Budget"
                    >
                        <Edit2 size={14} className="text-slate-400" />
                    </button>
                ) : (
                    <div className="flex gap-1 animate-in fade-in duration-200">
                        <button
                            onClick={handleSave}
                            className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg text-emerald-600 transition-colors"
                        >
                            <Check size={16} />
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-rose-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-5">
                <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-medium text-slate-500 dark:text-slate-400">
                        <span>Spent this month</span>
                        <span>Monthly Budget</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {currencySymbol}
                            {monthlyExpenses.toLocaleString()}
                        </span>
                        {isEditing ? (
                            <div className="flex items-center gap-1">
                                <span className="text-slate-400 font-medium">
                                    {currencySymbol}
                                </span>
                                <input
                                    type="number"
                                    value={tempBudget}
                                    onChange={(e) =>
                                        setTempBudget(e.target.value)
                                    }
                                    className="w-24 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 ring-blue-500/20 text-sm font-bold text-slate-900 dark:text-slate-100"
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <span className="text-slate-400 dark:text-slate-500 font-semibold">
                                / {currencySymbol}
                                {monthlyBudget.toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden shadow-inner">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${isOverBudget ? "bg-rose-500" : "bg-blue-500"}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between items-center px-0.5">
                        <div
                            className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${isOverBudget ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}
                        >
                            {isOverBudget ? (
                                <>
                                    <AlertCircle size={14} />
                                    <span>
                                        {currencySymbol}
                                        {(
                                            monthlyExpenses - monthlyBudget
                                        ).toLocaleString()}{" "}
                                        over budget
                                    </span>
                                </>
                            ) : (
                                <>
                                    <TrendingUp size={14} />
                                    <span>
                                        {100 - progress}% budget remaining
                                    </span>
                                </>
                            )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {progress}% used
                        </span>
                    </div>
                </div>

                {!isOverBudget && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed">
                            Great job! You are currently on track to stay under
                            your budget this month.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
