import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', email),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getStats: () => api.get('/users/stats'),
  getLeaderboard: () => api.get('/users/leaderboard'),
};

// Activities API calls
export const activitiesAPI = {
  getAll: (filters) => api.get('/activities', { params: filters }),
  getById: (id) => api.get(`/activities/${id}`),
  create: (activityData) => api.post('/activities', activityData),
  update: (id, activityData) => api.put(`/activities/${id}`, activityData),
  delete: (id) => api.delete(`/activities/${id}`),
};

// Carbon API calls
export const carbonAPI = {
  getFactors: () => api.get('/carbon/factors'),
  calculate: (activityData) => api.post('/carbon/calculate', activityData),
  getOffsetOptions: () => api.get('/carbon/offset-options'),
  calculateOffsetCost: (emissions) => api.post('/carbon/offset-cost', { emissions }),
};

// Challenges API calls
export const challengesAPI = {
  getAll: () => api.get('/challenges'),
  getById: (id) => api.get(`/challenges/${id}`),
  create: (challengeData) => api.post('/challenges', challengeData),
  join: (id) => api.post(`/challenges/${id}/join`),
  updateProgress: (id, progress) => api.put(`/challenges/${id}/progress`, progress),
  leave: (id) => api.delete(`/challenges/${id}/leave`),
  getUserChallenges: () => api.get('/challenges/user/me'),
};

// Admin API calls
export const adminAPI = {
  getUsers: (filters) => api.get('/admin/users', { params: filters }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getStats: () => api.get('/admin/stats'),
  getRecentActivities: () => api.get('/admin/recent-activities'),
};

export default api;
