import axios from 'axios';
import API_BASE_URL from '../../apiConfig';

const API_URL = `${API_BASE_URL}/api/users/`;

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