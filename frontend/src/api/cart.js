import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

export const getCart = async () => {
    const res = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
};

export const addToCart = async (itemId, quantity = 1) => {
    const res = await axios.post(`${API_URL}/cart/add`, { itemId, quantity }, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
};

export const removeFromCart = async (itemId) => {
    const res = await axios.post(`${API_URL}/cart/remove`, { itemId }, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
};
