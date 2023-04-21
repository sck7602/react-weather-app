import axios from 'axios';
import { WEATHER_URL } from '../environments/env';

const AxiosClient = axios.create({
  baseURL: WEATHER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosClient;