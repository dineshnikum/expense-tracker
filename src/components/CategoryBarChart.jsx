import { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useStore, { getCurrencySymbol } from "../store/useStore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export default function CategoryBarChart() {
    const { transactions, preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);

    const chartData = useMemo(() => {
        const categories = {};
        const expenses = transactions.filter((tx) => tx.type === "expense");

        expenses.forEach((tx) => {
            categories[tx.category] =
                (categories[tx.category] || 0) + tx.amount;
        });

        // Sort categories by amount descending
        const sortedLabels = Object.keys(categories).sort(
            (a, b) => categories[b] - categories[a],
        );
        const data = sortedLabels.map((label) => categories[label]);

        return {
            labels: sortedLabels,
            datasets: [
                {
                    label: "Spent",
                    data: data,
                    backgroundColor:
                        preferences.theme === "dark" ? "#6366f1" : "#4f46e5",
                    borderRadius: 4,
                    barThickness: 24,
                },
            ],
        };
    }, [transactions, preferences.theme]);

    const options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
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
                callbacks: {
                    label: (context) => {
                        return ` ${currencySymbol}${context.parsed.x.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: preferences.theme === "dark" ? "#334155" : "#f1f5f9",
                    drawBorder: false,
                },
                ticks: {
                    color: "#94a3b8",
                    font: { size: 10 },
                    maxTicksLimit: 5,
                    callback: (value) => `${currencySymbol}${value}`,
                },
            },
            y: {
                grid: { display: false },
                ticks: {
                    color: "#94a3b8",
                    font: { size: 11, weight: "600" },
                },
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 transition-colors h-full">
            <div className="mb-6">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                    Category Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Comparison of spending across all categories
                </p>
            </div>
            <div className="h-64">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}
