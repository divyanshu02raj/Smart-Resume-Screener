import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import AuthLayout from '../components/AuthLayout';
import PasswordInput from '../components/PasswordInput';

const PasswordStrengthMeter = ({ password }) => {
    const getStrength = () => {
        let score = 0;
        if (!password) return 0;
        if (password.length > 7) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };
    const strength = getStrength();
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    return (
        <div className="flex items-center gap-2 mt-2">
            <div className="w-full bg-gray-200 dark:bg-background rounded-full h-2">
                <div className={`h-2 rounded-full ${colors[strength - 1] || ''}`} style={{ width: `${(strength / 4) * 100}%`, transition: 'width 0.3s' }}></div>
            </div>
            <span className="text-sm text-gray-500 dark:text-text-secondary w-16 text-right">{labels[strength - 1] || ''}</span>
        </div>
    );
};

function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { user, signup, isLoading, error: authError } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password2) {
            setErrors({ general: 'Passwords do not match.' });
            return;
        }
        
        setErrors({});
        
        try {
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            };
            await signup(userData);
            navigate('/dashboard');
        } catch (err) {
        }
    };

    return (
        <AuthLayout>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create an Account</h1>
                <p className="text-gray-500 dark:text-text-secondary mt-2">Get started with your free account today.</p>
            </div>

            {authError && <ErrorMessage message={authError} />}

            <form onSubmit={onSubmit} className="space-y-4 mt-4">
                <div>
                    <label htmlFor="name" className="block text-gray-800 dark:text-text-primary font-semibold mb-2">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={onChange} 
                        required 
                        className="w-full p-3 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition" 
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-800 dark:text-text-primary font-semibold mb-2">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={onChange} required className="w-full p-3 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <PasswordInput id="password" name="password" value={formData.password} onChange={onChange} required minLength="6" />
                    {formData.password && <PasswordStrengthMeter password={formData.password} />}
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password</label>
                    <PasswordInput id="password2" name="password2" value={formData.password2} onChange={onChange} required minLength="6" />
                </div>
                <div className="pt-4">
                    <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-500 dark:text-text-secondary">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
                </p>
            </div>
        </AuthLayout>
    );
}

export default Signup;

