import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { API_KEY, WEATHER_URL } from '../../environments/env';
import { LocationWeather } from '../../models/current-weather';
import Detail from './Detail';

const WeatherAnotherCity = ({ onSelectCity }: any) => {
  const [citys, setCitys] = useState<LocationWeather[]>([]);

  useEffect(() => {
    getLocationWeather();
  }, []);

  const selectedCities = (city = 'Ha Noi') => {
    onSelectCity(city);
  };

  const getLocationWeather = (
    cityNameFirst = 'Ho Chi Minh',
    cityNameSecond = 'Da Nang'
  ) => {
    Promise.all([axiosGet(cityNameFirst), axiosGet(cityNameSecond)])
      .then(
        ([reqFirst, reqSecond]: [
          AxiosResponse<LocationWeather>,
          AxiosResponse<LocationWeather>
        ]) => {
          setCitys([reqFirst?.data, reqSecond?.data]);
        }
      )
      .catch((error) => console.log(error));
  };

  const axiosGet = (cityName: string) =>
    axios.get(
      `${WEATHER_URL}/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
    );

  return (
    <div>
      {citys.length &&
        citys.map((city, index) => (
          <Detail index={index} city={city} onSelect={selectedCities} />
        ))}
    </div>
  );
};

export default WeatherAnotherCity;
