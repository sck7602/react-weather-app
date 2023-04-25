import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { AnotherWeather, IAnotherCity } from '@/app/models';
import WeatherApi from '@/app/services/weather';
import Detail from './Detail';

const AnotherCity = ({ onSelectCity }: IAnotherCity) => {
  const [citys, setCitys] = useState<AnotherWeather[]>([]);

  useEffect(() => {
    getWeather();
  }, []);

  const selectedCities = (city = 'Ha Noi') => {
    onSelectCity(city);
  };

  const getWeather = useCallback(() => getAnotherWeather(), [citys]);

  const getAnotherWeather = (
    cityNameFirst = 'Ho Chi Minh',
    cityNameSecond = 'Da Nang'
  ) => {
    Promise.all([
      WeatherApi.getAnotherWeather(cityNameFirst),
      WeatherApi.getAnotherWeather(cityNameSecond),
    ]).then(
      ([reqFirst, reqSecond]: [
        AxiosResponse<AnotherWeather>,
        AxiosResponse<AnotherWeather>
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
