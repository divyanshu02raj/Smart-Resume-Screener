const productionUrl = 'https://smart-resume-screener-mcth.onrender.com';
const developmentUrl = 'http://localhost:5001';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? productionUrl : developmentUrl;

export default API_BASE_URL;