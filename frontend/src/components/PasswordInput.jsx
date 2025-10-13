import React, { useState } from 'react';

const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeSlashIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .847 0 1.673.124 2.458.352M4.228 5.472A19.933 19.933 0 0112 4c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-2.032 3.572M12 15a3 3 0 11-3-3m3 0l6 6m-6-6l-6-6" />
    </svg>
);


const PasswordInput = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                {...props}
                type={showPassword ? 'text' : 'password'}
                className="w-full p-3 pr-12 bg-gray-100 dark:bg-background border border-gray-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-text-secondary hover:text-primary dark:hover:text-primary-light transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
        </div>
    );
};

export default PasswordInput;