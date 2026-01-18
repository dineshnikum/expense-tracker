export default function SavingsGoal() {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
            <h3 className="font-bold text-lg mb-2">Savings Goal</h3>
            <p className="text-blue-100 text-sm mb-4">New Laptop</p>
            <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold">$1,200</span>
                <span className="text-blue-200 font-medium">
                    Target: $2,000
                </span>
            </div>
            <div className="w-full bg-blue-900/30 rounded-full h-2 mb-4">
                <div className="bg-emerald-400 h-2 rounded-full w-[60%]"></div>
            </div>
        </div>
    );
}
