import { IForecastHourly, Forecastday } from '@/app/models';
import { useContext, useEffect, useState } from 'react';
import HourChart from '../ForecastHourly/TemperatureChart';
import ThemeContext from '@/app/store/theme-context';

const ForecastHourly = ({
  forecastday,
  selectedIndex,
  location,
}: IForecastHourly) => {
  const [tempRange, setTempRange] = useState<number[]>([]);
  const [timeList, setTimeList] = useState<string[]>([]);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    categoryTimes();
  }, []);

  useEffect(() => {
    getTemperatureRange(forecastday, selectedIndex);
  }, [themeContext.darkTheme, forecastday, selectedIndex]);

  const getTemperatureRange = (
    days: Forecastday[],
    indexSelected = 0
  ): void => {
    const tempRange: number[] = [];
    if (days) {
      const selectedDay = days[indexSelected];
      const hours = selectedDay?.hour;
      if (hours) {
        for (let i = 0; i < hours.length; i++) {
          tempRange.push(Number(hours[i].temp_c));
        }
      }
    }

    setTempRange(tempRange);
  };

  const categoryTimes = () => {
    const times: string[] = [];
    for (let i = 1; i <= 24; i++) {
      if (i <= 12) {
        timeList.push(i.toString().padStart(2, '0') + ' AM');
      } else {
        timeList.push((i - 12).toString().padStart(2, '0') + ' PM');
      }
    }

    setTimeList(times);
  };

  return (
    <>
      <div
        className={`text-xl mt-5 ${
          !themeContext.darkTheme && 'text-blue-light'
        }`}
      >
        Hourly Forecast
      </div>
      <div className="mt-2 h-80 text-center">
        <HourChart
          categoryTimes={timeList}
          tempRange={tempRange}
          darkTheme={themeContext.darkTheme}
          locationName={location.name || ''}
        />
      </div>
    </>
  );
};

export default ForecastHourly;
