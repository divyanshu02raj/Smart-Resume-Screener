import axios from 'axios';

const API_URL = 'https://smart-resume-screener-mcth.onrender.com/api/users/';

const user = JSON.parse(localStorage.getItem('user'));

const signup = async (userData) => {
    const response = await axios.post(API_URL + 'signup', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    signup,
    login,
    logout,
};

export default authService;