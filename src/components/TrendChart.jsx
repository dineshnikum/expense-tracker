import { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useStore, { getCurrencySymbol } from "../store/useStore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

export default function TrendChart() {
    const { transactions, preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);

    const chartData = useMemo(() => {
        const now = new Date();
        const labels = [];
        const incomeData = [];
        const expenseData = [];

        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(now.getDate() - i);
            const dateStr = date.toDateString();

            labels.push(
                date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                }),
            );

            const dailyIncome = transactions
                .filter((tx) => {
                    const txDate = new Date(tx.date).toDateString();
                    return tx.type === "income" && txDate === dateStr;
                })
                .reduce((sum, tx) => sum + tx.amount, 0);

            const dailyExpense = transactions
                .filter((tx) => {
                    const txDate = new Date(tx.date).toDateString();
                    return tx.type === "expense" && txDate === dateStr;
                })
                .reduce((sum, tx) => sum + tx.amount, 0);

            incomeData.push(dailyIncome);
            expenseData.push(dailyExpense);
        }

        return {
            labels,
            datasets: [
                {
                    label: "Income",
                    data: incomeData,
                    borderColor: "#10b981",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
                {
                    label: "Expenses",
                    data: expenseData,
                    borderColor: "#f43f5e",
                    backgroundColor: "rgba(244, 63, 94, 0.1)",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
            ],
        };
    }, [transactions]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                align: "end",
                labels: {
                    color: preferences.theme === "dark" ? "#94a3b8" : "#64748b",
                    boxWidth: 10,
                    usePointStyle: true,
                    font: { size: 11, weight: "600" },
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
                callbacks: {
                    label: (context) => {
                        return ` ${context.dataset.label}: ${currencySymbol}${context.parsed.y.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: "#94a3b8",
                    font: { size: 10 },
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 7,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: preferences.theme === "dark" ? "#334155" : "#f1f5f9",
                    drawBorder: false,
                },
                ticks: {
                    color: "#94a3b8",
                    font: { size: 10 },
                    callback: (value) => `${currencySymbol}${value}`,
                    maxTicksLimit: 5,
                },
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 transition-colors h-full">
            <div className="mb-6">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                    Financial Trend
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Income vs Expenses for the last 30 days
                </p>
            </div>
            <div className="h-64">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
