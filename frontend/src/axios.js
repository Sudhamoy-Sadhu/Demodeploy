// src/axios.js
import axios from 'axios';

// Create an instance of axios with a custom configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',  // Base URL for the backend API
  headers: {
    'Content-Type': 'application/json',  // Set default content type to JSON
  },
});

// Optional: If you want to add interceptors for handling requests/responses
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any custom logic before sending the request (e.g., authentication)
    // For example, you can add a token if needed:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can handle successful responses globally here if needed
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error('API Error: ', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
