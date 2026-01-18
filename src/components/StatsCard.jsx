export default function StatsCard({ title, amount, icon: Icon, trend, color }) {
    const colorStyles = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-emerald-50 text-emerald-600",
        red: "bg-rose-50 text-rose-600",
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorStyles[color]}`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <span
                        className={`text-sm font-medium ${trend > 0 ? "text-emerald-600" : "text-rose-600"} flex items-center gap-1`}
                    >
                        {trend > 0 ? "+" : ""}
                        {trend}%
                    </span>
                )}
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">
                    {title}
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                    ${amount.toLocaleString()}
                </h3>
            </div>
        </div>
    );
}
