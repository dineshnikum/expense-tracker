import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEMO_TRANSACTIONS = [
    {
        id: "demo-1",
        title: "Freelance Project",
        amount: 3000,
        type: "income",
        category: "Income",
        date: new Date().toISOString(),
        isDemo: true,
    },
    {
        id: "demo-2",
        title: "Late Night Pizza",
        amount: 45,
        type: "expense",
        category: "Food",
        date: new Date(Date.now() - 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-3",
        title: "Monthly Rent",
        amount: 800,
        type: "expense",
        category: "Housing",
        date: new Date(Date.now() - 2 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-4",
        title: "Uber to Work",
        amount: 25,
        type: "expense",
        category: "Transport",
        date: new Date(Date.now() - 2 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-5",
        title: "PlayStation Plus",
        amount: 80,
        type: "expense",
        category: "Entertainment",
        date: new Date(Date.now() - 3 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-6",
        title: "Monthly Stipend",
        amount: 1100,
        type: "income",
        category: "Income",
        date: new Date(Date.now() - 4 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-7",
        title: "Grocery Run",
        amount: 200,
        type: "expense",
        category: "Food",
        date: new Date(Date.now() - 5 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-8",
        title: "Internet Bill",
        amount: 60,
        type: "expense",
        category: "Housing",
        date: new Date(Date.now() - 6 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-9",
        title: "Mobile Data Plan",
        amount: 50,
        type: "expense",
        category: "Shopping",
        date: new Date(Date.now() - 6 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-10",
        title: "Bike Fuel",
        amount: 40,
        type: "expense",
        category: "Transport",
        date: new Date(Date.now() - 10 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-11",
        title: "Cinema Date",
        amount: 145,
        type: "expense",
        category: "Entertainment",
        date: new Date(Date.now() - 12 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-12",
        title: "New Headphones",
        amount: 350,
        type: "expense",
        category: "Shopping",
        date: new Date(Date.now() - 15 * 86400000).toISOString(),
        isDemo: true,
    },

    {
        id: "demo-13",
        title: "Monthly Rent",
        amount: 800,
        type: "expense",
        category: "Housing",
        date: new Date(Date.now() - 32 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-14",
        title: "Uber to Work",
        amount: 30,
        type: "expense",
        category: "Transport",
        date: new Date(Date.now() - 32 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-15",
        title: "Monthly Stipend",
        amount: 1100,
        type: "income",
        category: "Income",
        date: new Date(Date.now() - 34 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-16",
        title: "Grocery Run",
        amount: 150,
        type: "expense",
        category: "Food",
        date: new Date(Date.now() - 35 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-17",
        title: "Freelance Project",
        amount: 2800,
        type: "income",
        category: "Income",
        date: new Date(Date.now() - 35 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-18",
        title: "Internet Bill",
        amount: 50,
        type: "expense",
        category: "Housing",
        date: new Date(Date.now() - 36 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-19",
        title: "Weekend Party",
        amount: 250,
        type: "expense",
        category: "Entertainment",
        date: new Date(Date.now() - 38 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-20",
        title: "Dinner Date",
        amount: 200,
        type: "expense",
        category: "Food",
        date: new Date(Date.now() - 38 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-21",
        title: "Bike Fuel",
        amount: 75,
        type: "expense",
        category: "Transport",
        date: new Date(Date.now() - 42 * 86400000).toISOString(),
        isDemo: true,
    },
    {
        id: "demo-22",
        title: "Clothing",
        amount: 500,
        type: "expense",
        category: "Shopping",
        date: new Date(Date.now() - 45 * 86400000).toISOString(),
        isDemo: true,
    },
];

const useStore = create(
    persist(
        (set, get) => ({
            user: {
                name: "Dinesh Nikum",
                email: "nikum@example.com",
            },
            preferences: {
                currency: "USD ($)",
                theme: "dark",
            },
            transactions: [],
            isSidebarOpen: false,
            isTransactionModalOpen: false,
            savingGoal: {
                title: "Macbook Pro",
                targetAmount: 2500,
                currentAmount: 850,
            },
            monthlyBudget: 3000,

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
                    transactions: [
                        ...state.transactions,
                        { ...transaction, isDemo: false },
                    ],
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
            loadDemoData: () => {
                const currentTransactions = get().transactions;
                const newTransactions = [...currentTransactions];

                DEMO_TRANSACTIONS.forEach((demoT) => {
                    if (!currentTransactions.some((t) => t.id === demoT.id)) {
                        newTransactions.push(demoT);
                    }
                });

                set({ transactions: newTransactions });
            },
            removeDemoData: () =>
                set((state) => ({
                    transactions: state.transactions.filter((t) => !t.isDemo),
                })),
            hasDemoData: () => get().transactions.some((t) => t.isDemo),
            setTransactionModalOpen: (open) =>
                set({ isTransactionModalOpen: open }),
            updateSavingGoal: (updates) =>
                set((state) => ({
                    savingGoal: { ...state.savingGoal, ...updates },
                })),
            updateMonthlyBudget: (amount) => set({ monthlyBudget: amount }),
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
