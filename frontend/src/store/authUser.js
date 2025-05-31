import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  error: null,

 signup: async (credentials) => {
    set({ isSigningUp: true, error: null });

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/signup",credentials,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.data.success) {
        set({ user: response.data.user, isSigningUp: false, error: null  });
        toast.success(response.data.message || "✅ Account created successfully!");
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.data.message || 'Signup failed';
        set({ isSigningUp: false, error: errorMsg });
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Signup failed. Please try again.";
      set({isSigningUp: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  login: async (credentials) => {
  set({ isLoggingIn: true, error: null });
  
  try {
    const response = await axios.post( "http://localhost:5000/api/v1/auth/login",   credentials,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );

    if (response.data.success) {
      set({ user: response.data.user, isLoggingIn: false,error: null });
      toast.success(response.data.message || "✅ Login successful!");
      return { success: true, data: response.data };
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";
    toast.error(errorMessage);
    set({ isLoggingIn: false, error: errorMessage 
    });
    throw error;
  }
},

  logout: async () => {
    set({ isLoggingOut: true, error: null });
    try {
      const response = await axios.post( "http://localhost:5000/api/v1/auth/logout", 
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        set({ user: null, isLoggingOut: false });
        toast.success(response.data.message || "✅ Logged out successfully!");
        return response.data;
      } else {
        throw new Error(response.data.message || 'Logout failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message ||  "Failed to logout properly";
      toast.error(errorMessage);
      set({ isLoggingOut: false });
      throw error;
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get("http://localhost:5000/api/v1/auth/authCheck",  
        { withCredentials: true }
      );

      if (response.data?.user) {
        set({  user: response.data.user,  isCheckingAuth: false, error: null 
        });
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Authentication check failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message ||  error.message || "Authentication check failed";
      set({ isCheckingAuth: false,  user: null, error: errorMessage
      });
      throw error;
    }
  }
}));