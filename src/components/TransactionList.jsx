import { ArrowUpRight, ArrowDownLeft, Trash } from "lucide-react";
import useStore, { getCurrencySymbol } from "../store/useStore";
import { useNavigate, useLocation } from "react-router-dom";

export default function TransactionList({ transactions }) {
    const { deleteTransaction, preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-700/50">
                <h3 className="font-bold text-slate-900 dark:text-slate-100">
                    Recent Transactions
                </h3>
                {location.pathname === "/" && (
                    <button
                        className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            navigate("/transactions");
                        }}
                    >
                        View All
                    </button>
                )}
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.map((tx) => (
                    <div
                        key={tx.id}
                        className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`p-2 rounded-full ${tx.type === "income" ? "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400"}`}
                            >
                                {tx.type === "income" ? (
                                    <ArrowDownLeft size={18} />
                                ) : (
                                    <ArrowUpRight size={18} />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    {tx.title}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {tx.category} • {tx.date}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`font-semibold flex items-center ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-slate-100"}`}
                        >
                            {tx.type === "income" ? "+" : "-"}
                            {currencySymbol}
                            {tx.amount.toLocaleString()}
                            <button
                                className="ml-4 cursor-pointer text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                onClick={() => deleteTransaction(tx.id)}
                            >
                                <Trash size={16} />
                            </button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
