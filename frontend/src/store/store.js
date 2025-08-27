import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice.js'
import authReducer from './authSlice.js'
import axios from 'axios'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

// Configure axios interceptors for authentication
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      store.dispatch({ type: 'auth/logout' })
      
      // Redirect to login if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    
    // Handle 403 Forbidden errors
    if (error.response?.status === 403) {
      window.location.href = '/unauthorized'
    }
    
    return Promise.reject(error)
  }
)

// Set default axios base URL for development
if (import.meta.env.DEV) {
  axios.defaults.baseURL = 'http://localhost:5000'
}
