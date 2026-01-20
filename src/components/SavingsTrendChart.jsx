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

export default function SavingsTrendChart() {
    const { transactions, preferences } = useStore();
    const currencySymbol = getCurrencySymbol(preferences.currency);

    const chartData = useMemo(() => {
        const now = new Date();
        const labels = [];
        const savingsData = [];
        let cumulativeSavings = 0;

        // Pre-calculate initial cumulative savings from transactions older than 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        cumulativeSavings = transactions
            .filter((tx) => new Date(tx.date) < thirtyDaysAgo)
            .reduce(
                (sum, tx) =>
                    sum + (tx.type === "income" ? tx.amount : -tx.amount),
                0,
            );

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

            const dailyDelta = transactions
                .filter((tx) => new Date(tx.date).toDateString() === dateStr)
                .reduce(
                    (sum, tx) =>
                        sum + (tx.type === "income" ? tx.amount : -tx.amount),
                    0,
                );

            cumulativeSavings += dailyDelta;
            savingsData.push(cumulativeSavings);
        }

        return {
            labels,
            datasets: [
                {
                    label: "Net Savings",
                    data: savingsData,
                    borderColor: "#3b82f6",
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) return null;
                        const gradient = ctx.createLinearGradient(
                            0,
                            chartArea.top,
                            0,
                            chartArea.bottom,
                        );
                        gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
                        gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)");
                        return gradient;
                    },
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    borderWidth: 3,
                },
            ],
        };
    }, [transactions]);

    const options = {
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
                        return ` Net Worth: ${currencySymbol}${context.parsed.y.toLocaleString()}`;
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
                    maxTicksLimit: 7,
                },
            },
            y: {
                beginAtZero: false,
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
                    Savings Growth
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cumulative balance trajectory over 30 days
                </p>
            </div>
            <div className="h-64">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
