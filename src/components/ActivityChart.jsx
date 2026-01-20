import { useState, useMemo } from "react";
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

export default function ActivityChart() {
    const { transactions, preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);
    const [range, setRange] = useState(7);

    const chartData = useMemo(() => {
        const now = new Date();
        const dates = [];
        const balances = [];

        for (let i = range - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            const dateStr = d.toDateString();
            dates.push(
                range === 7
                    ? d.toLocaleDateString("en-US", { weekday: "short" })
                    : d.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                      }),
            );

            // Calculate total expenses for this day
            const dailyTotal = transactions
                .filter((tx) => {
                    const txDate = new Date(tx.date).toDateString();
                    return tx.type === "expense" && txDate === dateStr;
                })
                .reduce((sum, tx) => sum + tx.amount, 0);

            balances.push(dailyTotal);
        }

        return {
            labels: dates,
            datasets: [
                {
                    label: "Expenses",
                    data: balances,
                    backgroundColor:
                        preferences.theme === "dark" ? "#3b82f6" : "#2563eb",
                    borderRadius: 6,
                    hoverBackgroundColor:
                        preferences.theme === "dark" ? "#60a5fa" : "#3b82f6",
                },
            ],
        };
    }, [transactions, range, preferences.theme]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
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
                displayColors: false,
                callbacks: {
                    label: (context) => {
                        return `${currencySymbol}${context.parsed.y.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#94a3b8",
                    font: {
                        size: 10,
                        weight: "600",
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: preferences.theme === "dark" ? "#334155" : "#f1f5f9",
                },
                ticks: {
                    color: "#94a3b8",
                    font: {
                        size: 10,
                    },
                    callback: (value) => `${currencySymbol}${value}`,
                },
            },
        },
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 transition-colors">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                        Activity Overview
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Daily spending for the last {range} days
                    </p>
                </div>
                <select
                    value={range}
                    onChange={(e) => setRange(Number(e.target.value))}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 outline-none rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                >
                    <option value={7}>Last 7 Days</option>
                    <option value={30}>Last 30 Days</option>
                </select>
            </div>

            <div className="h-48">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}
