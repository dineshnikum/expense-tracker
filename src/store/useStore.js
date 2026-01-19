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
                currency: "INR (₹)",
                language: "English (US)",
                theme: "light",
            },
            transactions: [],
            isSidebarOpen: false,
            isTransactionModalOpen: false,

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
        }),
        {
            name: "expense-tracker-storage",
        },
    ),
);

export default useStore;
