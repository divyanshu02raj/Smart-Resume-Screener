import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Loader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Authenticating with Google...</p>
    </div>
);

const GoogleCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginWithToken } = useAuth(); 

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            loginWithToken(token);
            navigate('/dashboard');
        } else {
            console.error("Google authentication failed: No token received.");
            navigate('/login');
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background">
            <Loader />
        </div>
    );
};

export default GoogleCallback;