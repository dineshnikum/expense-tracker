import useStore, { getCurrencySymbol } from "../store/useStore";
import { useState } from "react";
import { Edit2, Check, X, Target, TrendingUp } from "lucide-react";

export default function SavingsGoal() {
    const { savingGoal, updateSavingGoal, preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);
    const [isEditing, setIsEditing] = useState(false);
    const [tempGoal, setTempGoal] = useState({ ...savingGoal });

    const progress = Math.min(
        Math.round((savingGoal.currentAmount / savingGoal.targetAmount) * 100),
        100,
    );

    const handleSave = () => {
        updateSavingGoal(tempGoal);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempGoal({ ...savingGoal });
        setIsEditing(false);
    };

    const handleEdit = () => {
        setTempGoal({ ...savingGoal });
        setIsEditing(true);
    };

    return (
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-600/40 dark:to-blue-700/40 rounded-2xl p-6 text-white shadow-xl shadow-blue-200 dark:shadow-none transition-all duration-300 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6">
                <div className="flex-1 mr-4">
                    <h3 className="font-bold text-lg opacity-90 flex items-center gap-2">
                        <Target size={18} className="text-blue-200" />
                        Savings Goal
                    </h3>
                    {isEditing ? (
                        <input
                            type="text"
                            value={tempGoal.title}
                            onChange={(e) =>
                                setTempGoal({
                                    ...tempGoal,
                                    title: e.target.value,
                                })
                            }
                            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm mt-1 focus:outline-none focus:ring-2 ring-blue-400 w-full"
                            placeholder="Goal Title"
                        />
                    ) : (
                        <p className="text-blue-100 text-sm mt-1 font-medium italic">
                            {savingGoal.title}
                        </p>
                    )}
                </div>
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        title="Edit Goal"
                    >
                        <Edit2 size={16} className="text-blue-100" />
                    </button>
                ) : (
                    <div className="flex gap-1">
                        <button
                            onClick={handleSave}
                            className="p-2 hover:bg-emerald-400/20 rounded-full transition-colors text-emerald-300"
                            title="Save Changes"
                        >
                            <Check size={18} />
                        </button>
                        <button
                            onClick={handleCancel}
                            className="p-2 hover:bg-rose-400/20 rounded-full transition-colors text-rose-300"
                            title="Cancel"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-end gap-4">
                    <div className="flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-blue-200 block mb-1 font-bold">
                            Current Savings
                        </span>
                        {isEditing ? (
                            <input
                                type="number"
                                value={tempGoal.currentAmount}
                                onChange={(e) =>
                                    setTempGoal({
                                        ...tempGoal,
                                        currentAmount: Number(e.target.value),
                                    })
                                }
                                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xl font-bold focus:outline-none focus:ring-2 ring-blue-400 w-full"
                            />
                        ) : (
                            <span className="text-3xl font-bold">
                                {currencySymbol}
                                {Number(
                                    savingGoal.currentAmount,
                                ).toLocaleString()}
                            </span>
                        )}
                    </div>
                    <div className="text-right flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-blue-200 block mb-1 font-bold text-right">
                            Target Amount
                        </span>
                        {isEditing ? (
                            <input
                                type="number"
                                value={tempGoal.targetAmount}
                                onChange={(e) =>
                                    setTempGoal({
                                        ...tempGoal,
                                        targetAmount: Number(e.target.value),
                                    })
                                }
                                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 ring-blue-400 w-full text-right"
                            />
                        ) : (
                            <span className="text-blue-100 font-semibold block text-lg">
                                {currencySymbol}
                                {Number(
                                    savingGoal.targetAmount,
                                ).toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-medium transition-all">
                        <div className="flex items-center gap-1.5 text-blue-100">
                            <TrendingUp
                                size={12}
                                className="text-emerald-300"
                            />
                            <span>{progress}% completed</span>
                        </div>
                        <span className="text-blue-100">
                            {currencySymbol}
                            {Math.max(
                                0,
                                savingGoal.targetAmount -
                                    savingGoal.currentAmount,
                            ).toLocaleString()}{" "}
                            left
                        </span>
                    </div>
                    <div className="w-full bg-blue-900/30 rounded-full h-2.5 overflow-hidden ring-1 ring-white/5">
                        <div
                            className="bg-emerald-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
