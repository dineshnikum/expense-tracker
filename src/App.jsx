import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import useStore from "./store/useStore";
import AddTransactionModal from "./components/AddTransactionModal";

export default function App() {
    const theme = useStore((state) => state.preferences.theme);
    const { isTransactionModalOpen, setTransactionModalOpen } = useStore();

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    useEffect(() => {
        const { transactions, loadDemoData } = useStore.getState();
        if (transactions.length === 0) {
            loadDemoData();
        }
    }, []);

    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
            <AddTransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => setTransactionModalOpen(false)}
            />
        </>
    );
}
