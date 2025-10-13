import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-full p-4 sm:p-8 flex items-center justify-center bg-gray-100 dark:bg-background relative">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <Link 
                to="/" 
                className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-500 dark:text-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>
                    Back to Home
                </span>
            </Link>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl shadow-lg p-8">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;