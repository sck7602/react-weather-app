import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { LocationWeather } from '../../models/current-weather';
import { IAnotherCity } from '../../models/weather-app';
import WeatherApi from '../../services/Weather';
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
    Promise.all([
      WeatherApi.getLocationWeather(cityNameFirst),
      WeatherApi.getLocationWeather(cityNameSecond),
    ]).then(
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
