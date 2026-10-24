import axios from 'axios';

// Create Axios instance pointing to backend
const API = axios.create({
    baseURL: 'https://mern-stack-manager-backend.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically attach token to requests if user is logged in
API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        try {
            const parsed = JSON.parse(userInfo);
            if (parsed && parsed.token) {
                req.headers.Authorization = `Bearer ${parsed.token}`;
            }
        } catch (err) {
            // ignore JSON parse error if storage is empty or invalid
        }
    }
    return req;
});

export default API;