import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem("users") || "[]");

        // check duplicate username
        const exists = users.find(u => u.username === form.username);
        if (exists) {
            setError("Username already exists");
            return;
        }

        const newUser = {
            ...form,
            balance: 100000
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(newUser));

        navigate("/dashboard");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h2>

                {error && (
                    <p className="bg-red-500 p-2 mb-3 rounded text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;