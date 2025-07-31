import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import authHeader from '../../utils/authHeader';

export const loginAPI = async (credentials) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return res.data;
};

export const signupAPI = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return res.data;
};

export const getProfileAPI = async () => {
  const res = await axios.get(`${API_BASE_URL}/auth/profile`, { headers: authHeader() });
  return res.data;
};

export const updateProfileAPI = async (updates) => {
  const res = await axios.put(`${API_BASE_URL}/auth/profile`, updates, { headers: authHeader() });
  return res.data;
};

export const uploadProfileImageAPI = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await axios.post(`${API_BASE_URL}/auth/upload-profile-image`, formData, {
    headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};