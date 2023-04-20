import { IAnotherCity } from '../../models/weather-app';
import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { API_KEY, WEATHER_URL } from '../../environments/env';
import { LocationWeather } from '../../models/current-weather';
import Detail from './Detail';

const AnotherCity = ({ onSelectCity }: IAnotherCity) => {
  const [citys, setCitys] = useState<LocationWeather[]>([]);

  useEffect(() => {
    getWeather();
  }, []);

  const selectedCities = (city = 'Ha Noi') => {
    onSelectCity(city);
  };

  const getWeather = useCallback(() => getLocationWeather(), [citys]);

  const getLocationWeather = (
    cityNameFirst = 'Ho Chi Minh',
    cityNameSecond = 'Da Nang'
  ) => {
    const axiosGet = (cityName: string) =>
      axios.get(
        `${WEATHER_URL}/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );

    Promise.all([axiosGet(cityNameFirst), axiosGet(cityNameSecond)]).then(
      ([reqFirst, reqSecond]: [
        AxiosResponse<LocationWeather>,
        AxiosResponse<LocationWeather>
      ]) => {
        setCitys([reqFirst?.data, reqSecond?.data]);
      }
    );
  };

  return (
    <div>
      {citys.length &&
        citys.map((city, index) => (
          <Detail
            key={index}
            index={index}
            city={city}
            onSelect={selectedCities}
          />
        ))}
    </div>
  );
};

export default AnotherCity;
