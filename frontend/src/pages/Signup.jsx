import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import ErrorMessage from '../components/ErrorMessage'; // Reuse the ErrorMessage component

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '', // For password confirmation
    });

    const { email, password, password2 } = formData;

    const navigate = useNavigate();
    const { signup } = useAuth(); // Get signup function from context
    const [localError, setLocalError] = useState(null);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setLocalError("Passwords do not match");
            return;
        }
        setLocalError(null);
        try {
            await signup({ email, password });
            navigate('/dashboard'); // Redirect to dashboard on successful signup
        } catch (err) {
            setLocalError(err.message || 'Failed to sign up.');
        }
    };

    return (
        <div className="min-h-screen w-full p-4 sm:p-8 flex items-center justify-center bg-gray-100 dark:bg-background">
            <ThemeToggle />
            <motion.div 
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create an Account</h1>
                        <p className="text-gray-500 dark:text-text-secondary mt-2">Get started with your free account today.</p>
                    </div>

                    {localError && <ErrorMessage message={localError} />}

                    <form onSubmit={onSubmit} className="space-y-6 mt-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-800 dark:text-text-primary font-semibold mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="w-full p-3 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg text-gray-800 dark:text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" an="block text-gray-800 dark:text-text-primary font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                minLength="6"
                                className="w-full p-3 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg text-gray-800 dark:text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="password2" an="block text-gray-800 dark:text-text-primary font-semibold mb-2">Confirm Password</label>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={password2}
                                onChange={onChange}
                                required
                                minLength="6"
                                className="w-full p-3 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg text-gray-800 dark:text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-surface transition-all duration-300"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-500 dark:text-text-secondary">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-primary hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Signup;
