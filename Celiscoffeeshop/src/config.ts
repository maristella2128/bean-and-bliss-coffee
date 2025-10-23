// Application Configuration
// This file centralizes all configuration values

// API Base URL - reads from environment variable or falls back to local development
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// API Endpoints
export const API_ENDPOINTS = {
  contact: `${API_BASE_URL}/contact_pg.php`,
  orderForm: `${API_BASE_URL}/orderform_pg.php`,
  registration: `${API_BASE_URL}/registration_pg.php`,
  login: `${API_BASE_URL}/login.php`, // Add this when you create login endpoint
};

// Application Settings
export const APP_CONFIG = {
  name: 'Bean & Bliss Coffee',
  version: '1.0.0',
  environment: import.meta.env.MODE, // 'development' | 'production'
};

// Check if running in development mode
export const isDevelopment = import.meta.env.DEV;

// Check if running in production mode
export const isProduction = import.meta.env.PROD;

// Export environment variables
export const ENV = {
  API_URL: API_BASE_URL,
  MODE: import.meta.env.MODE,
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  APP_CONFIG,
  ENV,
  isDevelopment,
  isProduction,
};

