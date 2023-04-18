import { useEffect, useState } from 'react';
import humImage from '../../assets/images/hum.svg';
import windImage from '../../assets/images/wind.svg';
import { API_KEY, WEATHER_URL } from '../environment/env';
import { LocationWeather } from '../models/current-weather';
import '../style.css';

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
  ): void => {
    Promise.all([
      fetch(
        `${WEATHER_URL}/v1/current.json?key=${API_KEY}&q=${cityNameFirst}&aqi=no`
      ).then((res) => res.json()),
      fetch(
        `${WEATHER_URL}/v1/current.json?key=${API_KEY}&q=${cityNameSecond}&aqi=no`
      ).then((res) => res.json()),
    ])
      .then(([reqFirst, reqSecond]) => {
        setCitys([reqFirst, reqSecond]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {citys.length &&
        citys.map((city, index) => (
          <div
            key={index}
            className={`${
              index === 0
                ? 'bg-card-sub-one shadow-md shadow-rose-500/50'
                : 'bg-card-sub-two shadow-md shadow-orange-500/50'
            } bg-card-sub-one shadow-md shadow-rose-500/50 rounded-xl mt-5 p-5 h-24 flex justify-stretch hover:scale-105`}
            onClick={() => selectedCities(city.location?.name)}
          >
            <div className="w-1/2 text-left self-center">
              <div className="flex">
                <img
                  className="w-5 h-5 self-center"
                  src={windImage}
                  alt="Wind"
                />
                <div className="text-sm">
                  Wind | {city.current?.wind_kph}km/h
                </div>
              </div>
              <div className="flex">
                <img className="w-5 h-5 self-center" src={humImage} alt="Hum" />
                <div className="text-sm">Hum | {city.current?.humidity}%</div>
              </div>
            </div>
            <div className="w-1/2 text-right self-center">
              <div className="text-sm">{city.location?.name}</div>
              <div className="flex w-full justify-end">
                <img
                  className="w-10 h-10 self-center"
                  src={city.current?.condition.icon}
                  alt={city.current?.condition.text}
                />
                <div className="text-lg self-center">
                  {city.current?.temp_c}°C
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WeatherAnotherCity;
