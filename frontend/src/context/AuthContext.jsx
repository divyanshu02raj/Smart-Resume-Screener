import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import authService from '../features/auth/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyUserSession = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));

            // Only proceed if a user is found in storage
            if (storedUser && storedUser.token) {
                try {
                    // --- THE FIX ---
                    // Ask the backend: "Is this user's token still valid?"
                    const config = {
                        headers: {
                            Authorization: `Bearer ${storedUser.token}`,
                        },
                    };
                    
                    // Replace with your actual deployed backend URL
                    await axios.get('http://localhost:5001/api/users/me', config); ////https://smart-resume-screener-mcth.onrender.com


                    // If the API call succeeds, the token is valid. Set the user.
                    setUser(storedUser);

                } catch (err) {
                    // If the API call fails (e.g., with a 401 error), the token is invalid.
                    // Log the user out to clear the bad data from localStorage.
                    authService.logout();
                    setUser(null);
                }
            }
            // The authentication check is now definitively complete.
            setIsLoading(false);
        };

        verifyUserSession();
    }, []);

    const login = async (userData) => {
        try {
            const response = await authService.login(userData);
            setUser(response);
            setError(null);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        }
    };

    const signup = async (userData) => {
        try {
            const response = await authService.signup(userData);
            setUser(response);
            setError(null);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
            throw err;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

