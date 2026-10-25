import React, { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/forgot-password', { email });
            setMessage(data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
            setMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
                {message && <p className="text-green-600 text-sm mb-2 text-center">{message}</p>}
                {error && <p className="text-red-600 text-sm mb-2 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Send Reset Link
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-sm text-blue-600 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;