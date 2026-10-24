import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api'; // ya jahan se bhi api import kar rahe ho

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Yahan endpoint '/auth/register' hona chahiye
            const { data } = await API.post('/auth/register', { name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert('Registration Successful!');
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    // ... form JSX
}