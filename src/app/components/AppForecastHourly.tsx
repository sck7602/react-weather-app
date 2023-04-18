import * as Highcharts from 'highcharts';
import { useEffect, useState } from 'react';
import { Forecastday, Hour } from '../models/weather';
import '../style.css';
import HighchartsReact from 'highcharts-react-official';

const ForecastHourlyComponent = ({
  darkTheme,
  forecastday,
  selectedIndex,
  location,
}: any) => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

  useEffect(() => {
    getTemperatureRange(forecastday, selectedIndex, darkTheme);
  }, [darkTheme, forecastday, selectedIndex]);

  const getTemperatureRange = (
    days: Forecastday[] | undefined,
    indexSelected = 0,
    darkTheme: boolean
  ): void => {
    const tempRange: number[] = [];
    days?.forEach((day, index) => {
      if (index === indexSelected) {
        day.hour?.forEach((hrs: Hour) => {
          tempRange.push(hrs.temp_c!);
        });
      }
    });

    setOptionChart(tempRange, darkTheme);
  };

  const setOptionChart = (temperatureRange: number[], darkTheme: boolean) => {
    setChartOptions({
      chart: {
        type: 'spline',
        backgroundColor: darkTheme ? '#3b3b73' : '#fff',
        borderRadius: 20,
      },
      title: {
        text: 'Hourly Average Temperature',
        style: {
          color: darkTheme ? '#fff' : '#000',
        },
      },
      xAxis: {
        categories: [
          '01 AM',
          '02 AM',
          '03 AM',
          '04 AM',
          '05 AM',
          '06 AM',
          '07 AM',
          '08 AM',
          '09 AM',
          '10 AM',
          '11 AM',
          '12 AM',
          '01 PM',
          '02 PM',
          '03 PM',
          '04 PM',
          '05 PM',
          '06 PM',
          '07 PM',
          '08 PM',
          '09 PM',
          '10 PM',
          '11 PM',
          '12 PM',
        ],
      },
      yAxis: {
        title: {
          text: 'Temperature °C',
          style: {
            color: darkTheme ? '#fff' : '#000',
          },
        },
      },
      tooltip: {
        valueSuffix: ' °C',
      },
      plotOptions: {
        spline: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: location?.name,
          data: temperatureRange,
        },
      ],
    } as Highcharts.Options);
  };

  return (
    <>
      <div className={`text-xl mt-5 ${!darkTheme && 'text-blue-light'}`}>
        Hourly Forecast
      </div>
      <div className="mt-2 h-80 text-center">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{ style: { height: '100%' } }}
        />
      </div>
    </>
  );
};

export default ForecastHourlyComponent;
