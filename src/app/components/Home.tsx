import { useEffect, useState } from 'react';
import locationImage from '../../assets/images/location.svg';
import { API_KEY, WEATHER_URL } from '../environment/env';
import { Forecastday, Weather } from '../models/weather';
import '../style.css';
import AppForecastDays from './AppForecastDays';
import AppForecastHourly from './AppForecastHourly';
import AppWeatherAnotherCity from './AppWeatherAnotherCity';
import AppWeatherDayDetail from './AppWeatherDayDetail';
import AppWelcomeHeader from './AppWelcomeHeader';

const Home = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [weather, setWeather] = useState<Weather>();
  const [selectedDay, setSelectedDay] = useState<Forecastday>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    getTheme();
    detectLocation();
    getWeather();

    const intervalCall = setInterval(() => {
      setIsLoading(true);
      getWeather();
    }, 600000);

    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  const searchLocation = (
    latitude: string,
    longitude: string,
    cityName: string
  ) => {
    let searchLocation = '';
    if (!latitude && !longitude) {
      searchLocation = 'Hai Phong';
    } else {
      searchLocation = `${latitude},${longitude}`;
    }

    if (cityName) {
      searchLocation = cityName;
    }

    return searchLocation;
  };

  const changeTheme = (status: boolean) => {
    setDarkTheme(status);
    localStorage.setItem('THEME', status ? 'DARK' : 'LIGHT');
  };

  const onSelectCity = (city: string) => {
    setIsLoading(true);
    getWeather(city);
  };

  const onSearchCity = (event: any) => {
    const textSearch = event.target.value.trim();

    if (textSearch) {
      setIsLoading(true);

      const location = searchLocation(latitude, longitude, textSearch);
      fetch(
        `${WEATHER_URL}/v1/forecast.json?key=${API_KEY}&q=${location}&days=10&aqi=no&alerts=no`
      )
        .then((res) => res.json())
        .then((res) => {
          event.target.value = '';
          setIsLoading(false);
          handleResponse(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onSelectDay = (index: number) => {
    if (weather?.forecast?.forecastday) {
      setSelectedIndex(index);
      setSelectedDay(weather.forecast.forecastday[index]);
    }
  };

  const detectLocation = (isClick = false) => {
    if (!isClick) {
      const locationString = localStorage.getItem('LOCATION');
      if (locationString) {
        const location = JSON.parse(locationString);
        if (location) {
          setLatitude(location.latitude);
          setLongitude(location.longitude);
        }
        return;
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(String(position.coords.latitude));
        setLongitude(String(position.coords.longitude));

        if (isClick) {
          setIsLoading(true);
          getWeather();
        }

        localStorage.setItem(
          'LOCATION',
          JSON.stringify({
            latitude: latitude,
            longitude: longitude,
          })
        );
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const getWeather = (cityName = '') => {
    const location = searchLocation(latitude, longitude, cityName);
    fetch(
      `${WEATHER_URL}/v1/forecast.json?key=${API_KEY}&q=${location}&days=10&aqi=no&alerts=no`
    )
      .then((res) => res.json())
      .then((res) => {
        setIsFirstLoad(false);
        setIsLoading(false);
        handleResponse(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleResponse = (res: Weather) => {
    if (res) {
      setWeather(res);
      if (res.location) {
        localStorage.setItem(
          'LOCATION',
          JSON.stringify({
            latitude: res.location.lat,
            longitude: res.location.lon,
          })
        );
      }
    }
  };

  const getTheme = () => {
    const themeLocal = localStorage.getItem('THEME');
    const currentTheme = darkTheme ? 'DARK' : 'LIGHT';

    if (themeLocal && themeLocal !== currentTheme) {
      setDarkTheme(themeLocal === 'DARK');
    }
  };

  return (
    <div
      className={`container flex justify-center items-center m-auto text-light font-mono max-sm:p-0 md:h-screen ${
        darkTheme ? 'text-white' : 'text-black'
      }`}
    >
      {!isFirstLoad && weather && (
        <div className="flex h-fit w-full max-sm:flex-col max-sm:overflow-auto lg:h-fit">
          <div
            className={`shadow-lg rounded-tl-md rounded-bl-md w-2/3 p-10 max-sm:w-full max-lg:p-5 max-sm:order-last max-sm:rounded-none max-lg:w-7/12 ${
              !darkTheme ? 'bg-left-light' : 'bg-left-dark'
            }`}
          >
            <div className="max-sm:hidden">
              <AppWelcomeHeader
                darkTheme={darkTheme}
                changeTheme={changeTheme}
              />
            </div>
            {weather?.forecast?.forecastday && weather?.location && (
              <AppForecastHourly
                location={weather.location}
                forecastday={weather.forecast.forecastday}
                selectedIndex={selectedIndex}
                darkTheme={darkTheme}
              />
            )}
            {weather?.forecast?.forecastday && (
              <AppForecastDays
                darkTheme={darkTheme}
                forecastday={weather.forecast.forecastday}
                selectDay={onSelectDay}
              />
            )}
          </div>
          <div
            className={`rounded-tr-md rounded-br-md w-1/3 p-10 max-sm:w-full max-lg:p-5 max-sm:rounded-none max-lg:w-5/12 text-white ${
              !darkTheme ? 'bg-right-light' : 'bg-right-dark'
            }`}
          >
            <div className="hidden max-sm:block">
              <AppWelcomeHeader
                darkTheme={darkTheme}
                changeTheme={changeTheme}
              />
            </div>
            <div className="flex bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 p-1 rounded-lg opacity-75 hover:opacity-100">
              <input
                className={`shadow-sm w-full h-10 pl-2 outline-1 outline-indigo-600 rounded-lg hover:shadow-md hover:shadow-indigo-800 hover:text-md duration-300 ${
                  darkTheme
                    ? 'bg-search-city text-white'
                    : 'bg-search-city-light text-black'
                }`}
                type="text"
                placeholder="Search city..."
                onBlur={onSearchCity}
                onKeyUp={(e) => e.key === 'Enter' && onSearchCity(e)}
              />
              <button
                className="w-12 hover:scale-110"
                title="Detect location"
                onClick={() => detectLocation(true)}
              >
                <img className="mx-auto" src={locationImage} alt="Location" />
              </button>
            </div>
            {weather?.location && weather?.current && (
              <AppWeatherDayDetail
                location={weather.location}
                selectedDay={selectedDay}
                current={weather.current}
              />
            )}
            <AppWeatherAnotherCity onSelectCity={onSelectCity} />
          </div>
        </div>
      )}

      {!isFirstLoad && !weather && (
        <div className="flex justify-center items-center w-screen h-screen">
          <div className="text-5xl text-white">404 Not Found!</div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-indigo-500 opacity-50">
          <div className="flex min-h-screen w-full items-center justify-center opacity-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
              <div className="h-9 w-9 rounded-full bg-indigo-500 opacity-50"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
