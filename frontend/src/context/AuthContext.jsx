import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import authService from '../features/auth/authService';
import { jwtDecode } from 'jwt-decode';
import API_BASE_URL from '../apiConfig';

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
                    await axios.get(`${API_BASE_URL}/api/users/me`, config);
                    
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
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
    const loginWithToken = (token) => {
        try {
            const decoded = jwtDecode(token);

            const userObject = {
                id: decoded.id,
                name: decoded.name,
                token: token,
            };

            localStorage.setItem('user', JSON.stringify(userObject));

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(userObject);
            setError(null);

        } catch (err) {
            console.error("Failed to decode token", err);
            setError("Invalid authentication token.");
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, signup, logout, loginWithToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);