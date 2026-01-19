export default function ActivityChart() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = [45, 60, 35, 80, 55, 90, 70];
    const max = Math.max(...data);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 transition-colors">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                        Weekly Activity
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Overview of your spending habits
                    </p>
                </div>
                <select className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 border-none outline-none rounded-lg px-2 py-1">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                </select>
            </div>

            <div className="flex items-end justify-between h-48 gap-2">
                {data.map((value, i) => (
                    <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-3 group"
                    >
                        <div className="relative w-full flex items-end justify-center h-full">
                            {/* Tooltip */}
                            <div className="absolute -top-8 bg-slate-800 dark:bg-slate-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                ${value * 10}
                            </div>
                            {/* Bar */}
                            <div
                                className={`w-full max-w-[32px] rounded-t-lg transition-all duration-500 ease-out cursor-pointer ${
                                    i === 5
                                        ? "bg-blue-600 dark:bg-blue-500"
                                        : "bg-slate-100 dark:bg-slate-700 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40"
                                }`}
                                style={{ height: `${(value / max) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            {days[i]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
