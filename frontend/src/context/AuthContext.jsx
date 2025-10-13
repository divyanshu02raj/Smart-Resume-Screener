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

            if (storedUser && storedUser.token) {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${storedUser.token}`,
                        },
                    };

                    await axios.get('https://smart-resume-screener-mcth.onrender.com/api/users/me', config);

                    setUser(storedUser);

                } catch (err) {
                    authService.logout();
                    setUser(null);
                }
            }
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

