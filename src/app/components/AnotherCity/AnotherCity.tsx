import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { AnotherWeather, IAnotherCity } from '@/app/models';
import WeatherApi from '@/app/services/weather';
import Detail from './Detail';

const AnotherCity = ({ onSelectCity }: IAnotherCity) => {
  const [citys, setCitys] = useState<AnotherWeather[]>([]);
  const [firstCity, _setFirstCity] = useState<string>('Ho Chi Minh');
  const [lastCity, _setLastCity] = useState<string>('Da Nang');

  useEffect(() => {
    getWeather();
  }, []);

  const selectedCities = (city = 'Ha Noi') => {
    onSelectCity(city);
  };

  const getWeather = useCallback(
    () => getAnotherWeather(firstCity, lastCity),
    [firstCity, lastCity]
  );

  const getAnotherWeather = (firstCityName: string, lastCityName: string) => {
    Promise.all([
      WeatherApi.getAnotherWeather(firstCityName),
      WeatherApi.getAnotherWeather(lastCityName),
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
