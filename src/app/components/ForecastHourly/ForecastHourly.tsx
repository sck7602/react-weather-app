import { useEffect, useState } from 'react';
import { Forecastday } from '../../models/weather';
import HourChart from '../ForecastHourly/TemperatureChart';

const ForecastHourlyComponent = ({
  darkTheme,
  forecastday,
  selectedIndex,
  location,
}: any) => {
  const [tempRange, setTempRange] = useState<number[]>([]);

  useEffect(() => {
    getTemperatureRange(forecastday, selectedIndex);
  }, [darkTheme, forecastday, selectedIndex]);

  const getTemperatureRange = (
    days: Forecastday[] | undefined,
    indexSelected = 0
  ): void => {
    const tempRange: number[] = [];
    if (days) {
      const selectedDay = days[indexSelected];
      const hours = selectedDay?.hour;
      if (hours) {
        for (let i = 0; i < hours.length; i++) {
          tempRange.push(hours[i].temp_c!);
        }
      }
    }

    setTempRange(tempRange);
  };

  const categoryTimes = () => {
    const timeList = [];
    for (let i = 1; i <= 24; i++) {
      if (i <= 12) {
        timeList.push(i.toString().padStart(2, '0') + ' AM');
      } else {
        timeList.push((i - 12).toString().padStart(2, '0') + ' PM');
      }
    }

    return timeList;
  };

  return (
    <>
      <div className={`text-xl mt-5 ${!darkTheme && 'text-blue-light'}`}>
        Hourly Forecast
      </div>
      <div className="mt-2 h-80 text-center">
        <HourChart
          categoryTimes={categoryTimes}
          tempRange={tempRange}
          darkTheme={darkTheme}
          locationName={location.name}
        />
      </div>
    </>
  );
};

export default ForecastHourlyComponent;
