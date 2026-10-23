import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://mern-task-manager-backend.onrender.com/api/auth/forgot-password', { email });
            setMessage(res.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
            setMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
                {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                <input
                    type="email"
                    placeholder="Enter registered Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-sm"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Send Reset Link
                </button>
                <div className="text-center mt-3 text-sm">
                    <Link to="/login" className="text-gray-600 hover:underline">Back to Login</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;