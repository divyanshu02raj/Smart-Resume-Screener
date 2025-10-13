import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const navigate = useNavigate();
    const { user, login, isLoading, error } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };
        login(userData);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-background">
            <ThemeToggle />
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-center text-gray-500 dark:text-text-secondary mb-8">Sign in to access your dashboard.</p>

                    {error && <div className="bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4 text-center">{error}</div>}

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-800 dark:text-text-primary font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="w-full p-3 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg text-gray-800 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-800 dark:text-text-primary font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                className="w-full p-3 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg text-gray-800 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 dark:text-text-secondary mt-6">
                        Don't have an account? <Link to="/signup" className="font-semibold text-primary hover:underline">Sign Up</Link>
                    </p>
                </div>
                <div className="text-center mt-4">
                    <Link to="/" className="text-sm text-gray-500 dark:text-text-secondary hover:underline">
                        &larr; Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;

