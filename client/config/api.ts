// API Configuration
// Update the IP address to your machine's network IP

const API_CONFIG = {
  // For development on the same machine
  LOCAL_URL: 'http://localhost:3000',
  
  // For development from other devices on the network
  // Replace with your machine's IP address
  NETWORK_URL: 'http://10.0.0.203:3000',
  
  // Use this to switch between local and network access
  // Set to true when testing from other devices
  USE_NETWORK: true,
};

export const API_BASE_URL = API_CONFIG.USE_NETWORK 
  ? API_CONFIG.NETWORK_URL 
  : API_CONFIG.LOCAL_URL;

export const API_ENDPOINTS = {
  TODOS: `${API_BASE_URL}/api/todos`,
  TODO: (id: string) => `${API_BASE_URL}/api/todos/${id}`,
  HEALTH: `${API_BASE_URL}/health`,
};