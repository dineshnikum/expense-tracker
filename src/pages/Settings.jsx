import { User, Globe, CheckCircle2 } from "lucide-react";
import useStore from "../store/useStore";
import { useState } from "react";

export default function Settings() {
    const { user, updateUser, preferences, updatePreferences } = useStore();
    const [localUser, setLocalUser] = useState(user);
    const [localPreferences, setLocalPreferences] = useState(preferences);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        updateUser(localUser);
        updatePreferences(localPreferences);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleDiscard = () => {
        setLocalUser(user);
        setLocalPreferences(preferences);
    };

    return (
        <div
            key={`${user.name}-${user.email}`}
            className="max-w-4xl space-y-8 pb-12 relative"
        >
            {isSaved && (
                <div className="fixed top-6 right-6 flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 z-50">
                    <CheckCircle2 size={20} />
                    <span className="font-semibold">
                        Settings saved successfully!
                    </span>
                </div>
            )}

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <User
                            size={20}
                            className="text-blue-600 dark:text-blue-400"
                        />
                        Profile Settings
                    </h3>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all text-slate-900 dark:text-slate-100"
                                onChange={(e) =>
                                    setLocalUser({
                                        ...localUser,
                                        name: e.target.value,
                                    })
                                }
                                value={localUser.name}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all text-slate-900 dark:text-slate-100"
                                onChange={(e) =>
                                    setLocalUser({
                                        ...localUser,
                                        email: e.target.value,
                                    })
                                }
                                value={localUser.email}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Globe
                            size={20}
                            className="text-indigo-600 dark:text-indigo-400"
                        />
                        Preferences
                    </h3>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Currency
                            </label>
                            <select
                                onChange={(e) =>
                                    setLocalPreferences({
                                        ...localPreferences,
                                        currency: e.target.value,
                                    })
                                }
                                value={localPreferences.currency}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all text-slate-900 dark:text-slate-100"
                            >
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                                <option>INR (₹)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Theme
                            </label>
                            <select
                                onChange={(e) =>
                                    setLocalPreferences({
                                        ...localPreferences,
                                        theme: e.target.value,
                                    })
                                }
                                value={localPreferences.theme}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all text-slate-900 dark:text-slate-100"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={handleDiscard}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    Discard Changes
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
}
