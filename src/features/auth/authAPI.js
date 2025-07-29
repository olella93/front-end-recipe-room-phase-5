import API from "../../services/api";

export const registerUserAPI = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const loginUserAPI = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserAPI = async () => {
  try {
    const response = await API.get("/auth/profile"); 
    return response.data;
  } catch (error) {
    throw error;
  }
};
