import axios from 'axios';

// Default to backend port 5000 used by the included server (server.js)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
http.interceptors.request.use(
  (config) => {
    // The auth module stores tokens under 'accessToken' / 'refreshToken' / 'user'
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear the session keys used by storeSession / auth
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      // Redirect to auth page
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);
