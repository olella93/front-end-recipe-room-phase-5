import API from "../../services/api";

export const registerUserAPI = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response;
  } catch (error) {
    throw error; 
  }
};

export const loginUserAPI = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserAPI = async () => {
  try {
    const response = await API.get("/auth/me");
    return response;
  } catch (error) {
    throw error;
  }
};
