import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
    persist(
        (set) => ({
            user: {
                name: "Dinesh Nikum",
                email: "nikum@example.com",
            },
            preferences: {
                currency: "USD ($)",
                language: "English (US)",
                theme: "dark",
            },
            transactions: [],
            isSidebarOpen: false,
            isTransactionModalOpen: false,
            savingGoal: {
                title: "Macbook Pro",
                targetAmount: 120000,
                currentAmount: 0,
            },

            updateUser: (user) =>
                set((state) => ({ user: { ...state.user, ...user } })),
            updatePreferences: (preferences) =>
                set((state) => ({
                    preferences: { ...state.preferences, ...preferences },
                })),
            toggleSidebar: () =>
                set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            setSidebarOpen: (open) => set({ isSidebarOpen: open }),
            addTransaction: (transaction) =>
                set((state) => ({
                    transactions: [...state.transactions, transaction],
                })),
            deleteTransaction: (id) =>
                set((state) => ({
                    transactions: state.transactions.filter((t) => t.id !== id),
                })),
            updateTransaction: (id, updates) =>
                set((state) => ({
                    transactions: state.transactions.map((t) =>
                        t.id === id ? { ...t, ...updates } : t,
                    ),
                })),
            clearTransactions: () => set({ transactions: [] }),
            setTransactionModalOpen: (open) =>
                set({ isTransactionModalOpen: open }),
            updateSavingGoal: (updates) =>
                set((state) => ({
                    savingGoal: { ...state.savingGoal, ...updates },
                })),
        }),
        {
            name: "expense-tracker-storage",
        },
    ),
);

export const getCurrencySymbol = (currencyStr) => {
    const match = currencyStr?.match(/\((.*)\)/);
    return match ? match[1] : "$";
};

export default useStore;
