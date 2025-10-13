import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import PasswordInput from '../components/PasswordInput';
import ErrorMessage from '../components/ErrorMessage';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
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
        login({ email, password });
    };

    return (
        <AuthLayout>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
                <p className="text-center text-gray-500 dark:text-text-secondary">Sign in to access your dashboard.</p>
            </div>

            {error && <ErrorMessage message={error} />}

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
                        className="w-full p-3 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg text-gray-800 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                </div>
                <div>
                    <label htmlFor="password" an="block text-gray-800 dark:text-text-primary font-semibold mb-2">Password</label>
                    <PasswordInput
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-500 dark:text-text-secondary">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-primary hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}

export default Login;