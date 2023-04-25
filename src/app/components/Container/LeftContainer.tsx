import { ILeftContainer } from '@/app/models';
import ForecastHourly from '../ForecastHourly/ForecastHourly';
import ForecastDays from '../ForesCastDays/ForecastDays';
import Welcome from '../Welcome/Welcome';

const LeftContainer = ({
  darkTheme,
  changeTheme,
  weather,
  selectedIndex,
  onSelectDay,
}: ILeftContainer) => {
  return (
    <div
      className={`shadow-lg rounded-tl-md rounded-bl-md w-2/3 p-10 max-sm:w-full max-lg:p-5 max-sm:order-last max-sm:rounded-none max-lg:w-7/12 ${
        !darkTheme ? 'bg-left-light' : 'bg-left-dark'
      }`}
    >
      <div className="max-sm:hidden">
        <Welcome changeTheme={changeTheme} />
      </div>
      {weather?.forecast?.forecastday && weather?.location && (
        <ForecastHourly
          location={weather.location}
          forecastday={weather.forecast.forecastday}
          selectedIndex={selectedIndex}
        />
      )}
      {weather?.forecast?.forecastday && (
        <ForecastDays
          forecastday={weather.forecast.forecastday}
          selectDay={onSelectDay}
        />
      )}
    </div>
  );
};

export default LeftContainer;
