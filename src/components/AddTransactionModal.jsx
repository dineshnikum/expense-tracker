import { X, Plus } from "lucide-react";
import { useState } from "react";
import useStore, { getCurrencySymbol } from "../store/useStore";

export default function AddTransactionModal({ isOpen, onClose }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("Food");
    const { addTransaction, preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        addTransaction({
            id: Date.now(),
            title: description,
            amount: Number(amount),
            type,
            category,
            date: new Date().toDateString(),
        });

        // Reset and close
        setDescription("");
        setAmount("");
        setType("expense");
        setCategory("Food");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-700/50">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                        Add New Transaction
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-colors text-slate-500 dark:text-slate-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm"
                            placeholder="e.g. Netflix Subscription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500">
                                    {currencySymbol}
                                </span>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all text-slate-900 dark:text-slate-100"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Type
                            </label>
                            <select
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all appearance-none text-slate-900 dark:text-slate-100"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Category
                        </label>
                        <select
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all appearance-none text-slate-900 dark:text-slate-100"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Food</option>
                            <option>Housing</option>
                            <option>Transport</option>
                            <option>Entertainment</option>
                            <option>Shopping</option>
                            <option>Income</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 dark:shadow-none"
                        >
                            <Plus size={20} />
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
