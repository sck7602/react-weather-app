import { API_KEY } from '@/app/environments/env';
import AxiosClient from './axios-client';

const WeatherApi = {
  getWeather(location: string, days = 10, aqi = 'no', alerts = 'no') {
    const url = `/v1/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=${aqi}&alerts=${alerts}`;
    return AxiosClient.get(url);
  },
  getLocationWeather(cityName: string) {
    const url = `/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`;
    return AxiosClient.get(url);
  },
};

export default WeatherApi;
