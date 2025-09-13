// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://greentrace-backend-eh4d.onrender.com';

export const API_ENDPOINTS = {
  AUTH: {
    CHECK: `${API_BASE_URL}/api/auth/check/`,
    LOGIN: `${API_BASE_URL}/api/auth/login/`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout/`,
    REGISTER: `${API_BASE_URL}/api/auth/register/`,
  },
  PRODUCTS: {
    LIST: `${API_BASE_URL}/api/products/`,
    CREATE: `${API_BASE_URL}/api/products/create/`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/products/${id}/`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/products/${id}/`,
  },
  CREDITS: {
    LIST: `${API_BASE_URL}/api/credits/`,
    CREATE: `${API_BASE_URL}/api/credits/create/`,
    TRANSFER: (id: string) => `${API_BASE_URL}/api/credits/${id}/transfer/`,
    RETIRE: (id: string) => `${API_BASE_URL}/api/credits/${id}/retire/`,
  },
};

export default API_BASE_URL;
