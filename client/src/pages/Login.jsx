import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LogIn, User, Lock } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData, { withCredentials: true });
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-neutral-800 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-accent/10 rounded-full mb-4">
                        <LogIn className="w-8 h-8 text-accent" />
                    </div>
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-neutral-400 mt-2">Login to your Kodbank account</p>
                </div>

                {error && <div className="p-3 mb-6 text-sm text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-background border border-neutral-800 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-background border border-neutral-800 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/20"
                    >
                        Log In
                    </button>
                </form>

                <p className="mt-6 text-center text-neutral-400">
                    Don't have an account? <Link to="/register" className="text-accent hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
