export const API_URL =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_TEST_URL
    : process.env.VITE_TEST_URL || 'http://localhost:3000';