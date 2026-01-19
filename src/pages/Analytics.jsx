import ActivityChart from "../components/ActivityChart";
import { PieChart, TrendingUp, Target } from "lucide-react";

export default function Analytics() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">
                            Savings Rate
                        </p>
                        <h3 className="text-xl font-bold text-slate-900">
                            24%
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                        <PieChart size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">
                            Budget Used
                        </p>
                        <h3 className="text-xl font-bold text-slate-900">
                            $3,200 / $5k
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Target size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">
                            Daily Average
                        </p>
                        <h3 className="text-xl font-bold text-slate-900">
                            $42.50
                        </h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ActivityChart />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">
                        Top Categories
                    </h3>
                    <div className="space-y-6">
                        {[
                            { name: "Food", value: 35, color: "bg-blue-500" },
                            {
                                name: "Transport",
                                value: 25,
                                color: "bg-indigo-500",
                            },
                            {
                                name: "Entertainment",
                                value: 20,
                                color: "bg-rose-500",
                            },
                            { name: "Bills", value: 15, color: "bg-amber-500" },
                        ].map((cat) => (
                            <div key={cat.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 font-medium">
                                        {cat.name}
                                    </span>
                                    <span className="text-slate-900 font-bold">
                                        {cat.value}%
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${cat.color} rounded-full`}
                                        style={{ width: `${cat.value}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
