import axios from 'axios';
import { WEATHER_URL } from '../environments/env';

const AxiosClient = axios.create({
  baseURL: WEATHER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosClient.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosClient;
