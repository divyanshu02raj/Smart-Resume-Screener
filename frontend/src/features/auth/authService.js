import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users/'; //https://smart-resume-screener-mcth.onrender.com

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Signup user
const signup = async (userData) => {
    const response = await axios.post(API_URL + 'signup', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    signup,
    login,
    logout,
};

export default authService;