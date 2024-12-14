// src/utils/auth.js

import { jwtDecode } from "jwt-decode";  // Correct import (named import)

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);  // Use jwtDecode correctly
    const expiry = decoded.exp;
    if (expiry < Date.now() / 1000) {
      return false; // Token expired
    }
    return true;
  } catch (error) {
    return false; // Invalid token
  }
};

export const getRole = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);  // Use jwtDecode correctly
      return decoded.role; // Extract role from token (if available)
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem("token");
};
