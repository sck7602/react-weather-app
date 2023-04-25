import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useEffect, useState } from 'react';
import { IHourChart } from '@/app/models';

const HourChart = ({
  categoryTimes,
  tempRange,
  darkTheme,
  locationName,
}: IHourChart) => {
  const [optionChart, setOptionChart] = useState<Highcharts.Options>({});

  useEffect(() => {
    getOptionChart();
  }, [tempRange, darkTheme, locationName]);

  const getOptionChart = () => {
    setOptionChart({
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
        categories: categoryTimes,
        crosshair: true,
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
        valueSuffix: '°C',
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
          name: locationName,
          data: tempRange,
        },
      ],
    } as Highcharts.Options);
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={optionChart}
      containerProps={{ style: { height: '100%' } }}
    />
  );
};

export default HourChart;
