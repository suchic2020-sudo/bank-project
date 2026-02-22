import { useState, useEffect } from "react";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    // Get logged in user
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Show ₹100000 when clicking check balance
    const fetchBalance = () => {
        setLoading(true);

        setTimeout(() => {
            setBalance(100000); // IMPORTANT: sets ₹100000
            setLoading(false);
        }, 500);
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("user");
        window.location.href = "/#/login";
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">

            {/* SIDEBAR */}
            <div className="w-64 bg-gray-800 p-6">
                <h1 className="text-2xl font-bold mb-8">Kodbank</h1>

                <ul className="space-y-4">
                    <li className="text-blue-400 font-semibold">Dashboard</li>
                    <li className="hover:text-blue-400 cursor-pointer">Analytics</li>
                    <li className="hover:text-blue-400 cursor-pointer">Cards</li>
                    <li className="hover:text-blue-400 cursor-pointer">Assets</li>
                    <li className="hover:text-blue-400 cursor-pointer">Profile</li>
                </ul>

                <div className="mt-20 space-y-3">
                    <p className="cursor-pointer hover:text-blue-400">Settings</p>
                    <p
                        className="cursor-pointer hover:text-red-400"
                        onClick={logout}
                    >
                        Logout
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Welcome Back, {user?.username || "User"}
                </h1>

                {/* CARDS */}
                <div className="grid md:grid-cols-3 gap-6">

                    {/* BALANCE CARD */}
                    <div className="bg-gray-800 p-6 rounded-xl">
                        <h3 className="text-gray-400">Total Balance</h3>

                        <p className="text-2xl font-bold mt-2">
                            ₹ {loading ? "Loading..." : balance}
                        </p>

                        <button
                            onClick={fetchBalance}
                            className="mt-4 bg-blue-600 px-4 py-2 rounded"
                        >
                            Check Balance
                        </button>
                    </div>

                    {/* INCOME */}
                    <div className="bg-gray-800 p-6 rounded-xl">
                        <h3 className="text-gray-400">Monthly Income</h3>
                        <p className="text-2xl text-green-400 font-bold mt-2">
                            ₹ 20000
                        </p>
                    </div>

                    {/* EXPENSE */}
                    <div className="bg-gray-800 p-6 rounded-xl">
                        <h3 className="text-gray-400">Expenses</h3>
                        <p className="text-2xl text-red-400 font-bold mt-2">
                            ₹ 10000
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;