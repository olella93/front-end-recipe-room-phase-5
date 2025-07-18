import axios from "axios";
const API_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUserAPI = (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};