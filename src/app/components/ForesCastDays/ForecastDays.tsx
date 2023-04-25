import { IForecastDays, Forecastday } from '@/app/models';
import { useContext, useState } from 'react';
import Day from './Day';
import SelectDays from './SelectDays';
import ThemeContext from '@/app/store/theme-context';

const ForecastDays = ({ forecastday, selectDay }: IForecastDays) => {
  const [selectedDays, setSelectedDays] = useState(5);
  const [indexDay, setIndexDay] = useState(0);
  const themeContext = useContext(ThemeContext);

  const handleSelectDay = (value: number) => {
    setSelectedDays(value);
  };

  const onSelect = (index: number) => {
    setIndexDay(index);
    selectDay(index);
  };

  return (
    <>
      <div className="flex justify-between mt-5">
        <div
          className={`text-xl self-center ${
            !themeContext.darkTheme && 'text-blue-light'
          }`}
        >
          {selectedDays} Days Forecast
        </div>
        <div
          className={`hover:shadow-md ${
            themeContext.darkTheme
              ? 'hover:shadow-indigo-800'
              : 'hover:shadow-indigo-300'
          }`}
        >
          <SelectDays
            darkTheme={themeContext.darkTheme}
            selectedDays={selectedDays}
            onSelectedDays={handleSelectDay}
          />
        </div>
      </div>
      <div className="flex justify-center gap-2 w-full mt-2 max-sm:flex-col max-2xl:flex-wrap">
        {forecastday
          .slice(0, selectedDays)
          .map((item: Forecastday, index: number) => (
            <Day
              key={index}
              item={item}
              index={index}
              indexDay={indexDay}
              darkTheme={themeContext.darkTheme}
              onSelect={onSelect}
            />
          ))}
      </div>
    </>
  );
};

export default ForecastDays;
