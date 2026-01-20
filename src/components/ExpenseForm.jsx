import { Plus } from "lucide-react";
import { useState } from "react";
import useStore, { getCurrencySymbol } from "../store/useStore";

export default function ExpenseForm() {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("Food");
    const { addTransaction, preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);

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
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 transition-colors">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-6">
                Add New Transaction
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all text-slate-900 dark:text-slate-100"
                        placeholder="e.g. Grocery Shopping"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500">
                                {currencySymbol}
                            </span>
                            <input
                                type="number"
                                className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all text-slate-900 dark:text-slate-100"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Type
                        </label>
                        <select
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all appearance-none text-slate-900 dark:text-slate-100"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Category
                    </label>
                    <select
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all appearance-none text-slate-900 dark:text-slate-100"
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

                <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 shadow-lg shadow-blue-200 dark:shadow-none">
                    <Plus size={20} />
                    Add Transaction
                </button>
            </form>
        </div>
    );
}
