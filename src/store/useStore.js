import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
    persist((set) => ({
        transactions: [],
        isSidebarOpen: false,
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
    })),
);

export default useStore;
