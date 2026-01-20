import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useStore, { getCurrencySymbol } from "../store/useStore";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryPieChart() {
    const { transactions, preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);

    const chartData = useMemo(() => {
        const categories = {};
        const expenses = transactions.filter((tx) => tx.type === "expense");

        if (expenses.length === 0) return null;

        expenses.forEach((tx) => {
            categories[tx.category] =
                (categories[tx.category] || 0) + tx.amount;
        });

        const labels = Object.keys(categories);
        const data = Object.values(categories);

        const colors = [
            "#3b82f6", // blue
            "#6366f1", // indigo
            "#f43f5e", // rose
            "#f59e0b", // amber
            "#10b981", // emerald
            "#8b5cf6", // violet
            "#ec4899", // pink
        ];

        return {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor:
                        preferences.theme === "dark" ? "#1e293b" : "#ffffff",
                    borderWidth: 2,
                    hoverOffset: 10,
                },
            ],
        };
    }, [transactions, preferences.theme]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: preferences.theme === "dark" ? "#94a3b8" : "#64748b",
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 11,
                        weight: "600",
                    },
                },
            },
            tooltip: {
                backgroundColor:
                    preferences.theme === "dark" ? "#1e293b" : "#ffffff",
                titleColor:
                    preferences.theme === "dark" ? "#f8fafc" : "#0f172a",
                bodyColor: preferences.theme === "dark" ? "#f8fafc" : "#0f172a",
                borderColor:
                    preferences.theme === "dark" ? "#334155" : "#e2e8f0",
                borderWidth: 1,
                padding: 12,
                boxPadding: 4,
                callbacks: {
                    label: (context) => {
                        const total = context.dataset.data.reduce(
                            (a, b) => a + b,
                            0,
                        );
                        const value = context.parsed;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return ` ${currencySymbol}${value.toLocaleString()} (${percentage}%)`;
                    },
                },
            },
        },
        cutout: "70%",
    };

    if (!chartData) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 py-12">
                <p className="text-sm font-medium">No expense data available</p>
                <p className="text-xs">Add transactions to see distribution</p>
            </div>
        );
    }

    return (
        <div className="h-64 mt-4">
            <Doughnut data={chartData} options={options} />
        </div>
    );
}
