import { Target, TrendingUp } from "lucide-react";
import useStore, { getCurrencySymbol } from "../store/useStore";

export default function FinancialHealth() {
    const { preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Target size={18} className="text-blue-500" />
                Financial Health
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Monthly Budget</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {currencySymbol}5,000.00
                    </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[64%]" />
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                    <TrendingUp size={14} />
                    <span>You saved 12% more than last month</span>
                </div>
            </div>
        </div>
    );
}
