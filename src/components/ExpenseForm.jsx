import { Plus } from "lucide-react";
import { useState } from "react";
import useStore from "../store/useStore";

export default function ExpenseForm() {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("Food");
    const { addTransaction } = useStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            id: Date.now(),
            title: description,
            amount: Number(amount),
            type,
            category,
            date: new Date().toDateString(),
        });
        setDescription("");
        setAmount("");
        setType("expense");
        setCategory("Food");
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-6">
                Add New Transaction
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        placeholder="e.g. Grocery Shopping"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-400">
                                $
                            </span>
                            <input
                                type="number"
                                className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Type
                        </label>
                        <select
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option>Expense</option>
                            <option>Income</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Category
                    </label>
                    <select
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>Food</option>
                        <option>Transport</option>
                        <option>Entertainment</option>
                        <option>Bills</option>
                        <option>Other</option>
                    </select>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2">
                    <Plus size={20} />
                    Add Transaction
                </button>
            </form>
        </div>
    );
}
