import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, User, Mail, Phone, Lock } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        uid: '',
        username: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://bank-project-jtvq.onrender.com/api/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-neutral-800 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-accent/10 rounded-full mb-4">
                        <UserPlus className="w-8 h-8 text-accent" />
                    </div>
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-neutral-400 mt-2">Join Kodbank today</p>
                </div>

                {error && <div className="p-3 mb-6 text-sm text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="text"
                            name="uid"
                            placeholder="Unique ID"
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-background border border-neutral-800 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                        />
                    </div>
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
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-background border border-neutral-800 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                        />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
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
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-neutral-400">
                    Already have an account? <Link to="/login" className="text-accent hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
