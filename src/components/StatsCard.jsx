export default function StatsCard({ title, amount, icon: Icon, trend, color }) {
    const colorStyles = {
        blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
        green: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
        red: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400",
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorStyles[color]}`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <span
                        className={`text-sm font-medium ${trend > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"} flex items-center gap-1`}
                    >
                        {trend > 0 ? "+" : ""}
                        {trend}%
                    </span>
                )}
            </div>
            <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                    {title}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    ₹ {amount.toLocaleString()}
                </h3>
            </div>
        </div>
    );
}
