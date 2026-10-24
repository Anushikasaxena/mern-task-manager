import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://mern-task-manager-backend.onrender.com/api',
});

API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        try {
            const parsed = JSON.parse(userInfo);
            if (parsed && parsed.token) {
                req.headers.Authorization = `Bearer ${parsed.token}`;
            }
        } catch (err) { }
    }
    return req;
});

export default API;