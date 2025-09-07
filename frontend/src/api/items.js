import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getItems = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await axios.get(`${API_URL}/items?${params.toString()}`);
    return res.data;
};
