import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import authHeader from '../../utils/authHeader';

// Create a new group
export const createGroupAPI = async ({ name, description }) => {
  const res = await axios.post(
    `${API_BASE_URL}/groups`,
    { name, description },
    { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
  );
  return res.data;
};
// Delete a group
export const deleteGroupAPI = async (groupId) => {
  const res = await axios.delete(`${API_BASE_URL}/groups/${groupId}`, { headers: authHeader() });
  return res.data;
};

// Get all groups
export const fetchGroupsAPI = async () => {
  const res = await axios.get(`${API_BASE_URL}/groups`);
  return res.data;
};


// Get one group details
export const fetchGroupByIdAPI = async (id) => {
  const headers = authHeader(); 
  const res = await axios.get(`${API_BASE_URL}/groups/${id}`, {
    headers: Object.keys(headers).length ? headers : undefined
  });
  return res.data;
};

// Get recipes in a group
export const fetchGroupRecipesAPI = async (groupId) => {
  const res = await axios.get(`${API_BASE_URL}/groups/${groupId}/recipes`, {
    headers: authHeader()
  });
  return res.data;
};

// Join group
export const joinGroupAPI = async (groupId) => {
  const res = await axios.post(`${API_BASE_URL}/groups/${groupId}/join`, {}, {
    headers: authHeader()
  });
  return res.data;
};

// Leave group
export const leaveGroupAPI = async (groupId) => {
  const res = await axios.delete(`${API_BASE_URL}/groups/${groupId}/leave`, {
    headers: authHeader()
  });
  return res.data;
};


