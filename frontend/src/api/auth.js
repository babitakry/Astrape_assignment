import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (userData) => {
    const res = await axios.post(`${API_URL}/auth/signup`, userData);
    console.log("signup",res);
    return res.data;
};

export const login = async (userData) => {
    const res = await axios.post(`${API_URL}/auth/login`, userData);
    return res.data;
};
