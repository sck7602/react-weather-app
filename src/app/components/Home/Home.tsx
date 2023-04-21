import WeatherApi from '@/app/services/Weather';
import { useEffect, useState } from 'react';
import { Forecastday, Weather } from '../../models/weather';
import '../../style.css';
import Loading from '../Common/Loading';
import NotFoundPage from '../Common/NotFoundPage';
import LeftContainer from '../Home/LeftContainer';
import RightContainer from '../Home/RightContainer';

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
      searchLocation = 'Ha Noi';
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

  const onSearchCity = (textSearch: string) => {
    setIsLoading(true);
    const location = searchLocation(latitude, longitude, textSearch);

    WeatherApi.getWeather(location)
      .then((res) => {
        handleResponse(res?.data);
      })
      .finally(() => setIsLoading(false));
  };

  const onSelectDay = (index: number) => {
    if (weather?.forecast?.forecastday) {
      setSelectedIndex(index);
      setSelectedDay(weather.forecast.forecastday[index]);
    }
  };

  const detectLocation = (isClick = false) => {
    setIsLoading(true);

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

    WeatherApi.getWeather(location)
      .then((res) => {
        handleResponse(res.data);
      })
      .finally(() => {
        setIsFirstLoad(false);
        setIsLoading(false);
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
          <LeftContainer
            darkTheme={darkTheme}
            changeTheme={changeTheme}
            weather={weather}
            selectedIndex={selectedIndex}
            onSelectDay={onSelectDay}
          />
          <RightContainer
            darkTheme={darkTheme}
            weather={weather}
            selectedDay={selectedDay as Forecastday}
            onSelectCity={onSelectCity}
            changeTheme={changeTheme}
            detectLocation={detectLocation}
            onSearchCity={onSearchCity}
          />
        </div>
      )}
      {!isFirstLoad && !weather && <NotFoundPage />}
      {isLoading && <Loading />}
    </div>
  );
};

export default Home;
