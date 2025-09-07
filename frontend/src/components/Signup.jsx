import { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const data = await signup(formData);
            localStorage.setItem('token', data.token);
            alert('Signup successful');
            navigate('/items');
        } catch (error) {
            console.log(error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1" htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}
