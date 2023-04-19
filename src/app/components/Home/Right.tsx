import AnotherCity from '../AnotherCity/AnotherCity';
import DayDetail from '../DayDetail/DayDetail';
import SearchCity from '../SearchCity/SearchCity';
import Welcome from '../Welcome/Welcome';

const Right = ({
  darkTheme,
  weather,
  selectedDay,
  onSelectCity,
  changeTheme,
  detectLocation,
  onSearchCity,
}: any) => {
  return (
    <div
      className={`rounded-tr-md rounded-br-md w-1/3 p-10 max-sm:w-full max-lg:p-5 max-sm:rounded-none max-lg:w-5/12 text-white ${
        !darkTheme ? 'bg-right-light' : 'bg-right-dark'
      }`}
    >
      <div className="hidden max-sm:block">
        <Welcome darkTheme={darkTheme} changeTheme={changeTheme} />
      </div>
      <div className="flex bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 p-1 rounded-lg opacity-75 hover:opacity-100">
        <SearchCity
          darkTheme={darkTheme}
          onDetect={detectLocation}
          onSearch={onSearchCity}
        />
      </div>
      {weather?.location && weather?.current && (
        <DayDetail
          location={weather.location}
          selectedDay={selectedDay}
          current={weather.current}
        />
      )}
      <AnotherCity onSelectCity={onSelectCity} />
    </div>
  );
};

export default Right;
