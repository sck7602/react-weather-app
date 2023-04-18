import { useState } from 'react';
import '../style.css';
import { Forecastday } from '../models/weather';

const ForecastDaysComponent = ({ darkTheme, forecastday, selectDay }: any) => {
  const [selectedDays, setSelectedDays] = useState(5);
  const [indexDay, setIndexDay] = useState(0);

  const onSelectedDays = (event: any) => {
    setSelectedDays(parseInt(event.target.value));
  };

  const onSelect = (index: number) => {
    setIndexDay(index);
    selectDay(index);
  };

  return (
    <>
      <div className="flex justify-between mt-5">
        <div
          className={`text-xl self-center ${!darkTheme && 'text-blue-light'}`}
        >
          {selectedDays} Days Forecast
        </div>
        <div
          className={`hover:shadow-md ${
            darkTheme ? 'hover:shadow-indigo-800' : 'hover:shadow-indigo-300'
          }`}
        >
          <select
            id="days"
            onChange={onSelectedDays}
            className={`h-8 self-center shadow-sm outline-1 rounded-lg ${
              darkTheme
                ? 'bg-card-flex shadow-indigo-500/50 outline-indigo-600 border border-indigo-700'
                : 'bg-card-flex-light'
            }`}
            value={selectedDays}
          >
            <option value="10">10 days</option>
            <option value="9">9 days</option>
            <option value="8">8 days</option>
            <option value="7">7 days</option>
            <option value="6">6 days</option>
            <option value="5">5 days</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center gap-2 w-full mt-2 max-sm:flex-col max-2xl:flex-wrap">
        {forecastday
          .slice(0, selectedDays)
          .map((item: Forecastday, index: number) => (
            <div
              key={index}
              className={`h-36 max-sm:h-20 shadow-sm shadow-indigo-500/50 rounded-xl p-2 cursor-pointer text-center max-sm:flex max-sm:w-full sm:w-[150px] 2xl:flex-1 ${
                indexDay === index && darkTheme
                  ? 'bg-card-active'
                  : indexDay === index && !darkTheme
                  ? 'bg-card-active-light'
                  : darkTheme
                  ? 'bg-card-flex hover:bg-card-flex-hover'
                  : 'bg-card-flex-light hover:bg-card-flex-light-hover'
              }`}
              onClick={() => onSelect(index)}
            >
              <div className="mx-auto max-sm:flex-1">
                {item.day?.condition && (
                  <img
                    className="max-sm:w-16 max-sm:h-full mx-auto"
                    src={item.day.condition.icon}
                    alt={item.day.condition.text}
                  />
                )}
              </div>
              <div className="mt-3 max-sm:flex-1 max-sm:self-center">
                <div className="text-xs">
                  {item.date &&
                    new Date(item.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      day: 'numeric',
                    })}
                </div>
                {item.day && (
                  <div className="text-2xs">
                    {`${item.day.mintemp_c?.toFixed(
                      0
                    )}°C - ${item.day.maxtemp_c?.toFixed(0)}°C`}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ForecastDaysComponent;
