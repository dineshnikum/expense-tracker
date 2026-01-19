import TransactionList from "../components/TransactionList";
import { Search, Filter } from "lucide-react";

export default function Transactions() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium">
                        Export PDF
                    </button>
                </div>
            </div>

            <TransactionList />
        </div>
    );
}
