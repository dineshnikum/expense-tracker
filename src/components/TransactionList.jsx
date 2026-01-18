import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function TransactionList() {
    const transactions = [
        {
            id: 1,
            title: "Freelance Payment",
            category: "Income",
            amount: 1200,
            type: "income",
            date: "Today, 2:00 PM",
        },
        {
            id: 2,
            title: "Grocery Shopping",
            category: "Food",
            amount: 85.5,
            type: "expense",
            date: "Today, 10:30 AM",
        },
        {
            id: 3,
            title: "Netflix Subscription",
            category: "Entertainment",
            amount: 15.99,
            type: "expense",
            date: "Yesterday",
        },
        {
            id: 4,
            title: "Client Bonus",
            category: "Income",
            amount: 300,
            type: "income",
            date: "Yesterday",
        },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-900">
                    Recent Transactions
                </h3>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                    View All
                </button>
            </div>
            <div className="divide-y divide-slate-100">
                {transactions.map((tx) => (
                    <div
                        key={tx.id}
                        className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`p-2 rounded-full ${tx.type === "income" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}
                            >
                                {tx.type === "income" ? (
                                    <ArrowDownLeft size={18} />
                                ) : (
                                    <ArrowUpRight size={18} />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {tx.title}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {tx.category} • {tx.date}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`font-semibold ${tx.type === "income" ? "text-emerald-600" : "text-slate-900"}`}
                        >
                            {tx.type === "income" ? "+" : "-"}$
                            {tx.amount.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
