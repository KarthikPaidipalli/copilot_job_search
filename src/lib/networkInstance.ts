import axios from "axios";
import { getAccessToken } from "./local-storage";




export const axiosInstances = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
    headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': '*',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstances.interceptors.request.use((config) => {
  const token = getAccessToken()
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config
}, (error) => {
  return Promise.reject(error);
});


