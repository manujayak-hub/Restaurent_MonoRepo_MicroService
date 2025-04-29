import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Add token to header
const setAuthHeaders = (token) =>
{
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const AuthService = {
  // Register user
  register: async (userData) =>
  {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data;
  },

  // Login user
  login: async (credentials) =>
  {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data; // { accessToken, refreshToken }
  },

  // Refresh access token
  refreshToken: async (token) =>
  {
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, { token });
    return response.data; // { accessToken }
  },

  // Get current user details
  getUserDetails: async (accessToken) =>
  {
    const response = await axios.get(`${BASE_URL}/auth/getuserdetails`, setAuthHeaders(accessToken));
    return response.data;
  },

  // Logout (invalidate refresh token)
  logout: async (refreshToken) =>
  {
    const response = await axios.post(`${BASE_URL}/auth/logout`, { token: refreshToken });
    return response.data;
  },

  // Delete current user
  deleteUser: async (accessToken) =>
  {
    const response = await axios.delete(`${BASE_URL}/auth/delete-user`, setAuthHeaders(accessToken));
    return response.data;
  },
};

export default AuthService;
