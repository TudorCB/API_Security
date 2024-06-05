import { useState, useEffect } from 'react';

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const signIn = async (newToken) => {
    try {
      setToken(newToken);
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  };

  const signOut = () => {
    try {
      setToken(null);
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  };

  return {
    signIn,
    signOut,
    token,
  };
}