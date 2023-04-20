import { IDayDetail } from '../../models/weather-app';
import Image from '../Common/Image';

const DayDetail = ({ current, selectedDay, location }: IDayDetail) => {
  const temperatureC = (min: number | undefined, max: number | undefined) =>
    min && max && min.toFixed(0) + '°C - ' + max.toFixed(0) + '°C';

  const fixedNumber = (value: number | undefined) => value?.toFixed(0);

  const convertDate = (dateString: string | undefined) =>
    dateString &&
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });

  return (
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-md shadow-indigo-500/50 rounded-xl mt-7 p-5 h-96 text-center max-sm:mt-5 opacity-85 hover:opacity-100">
      <div className="text-xl text-left">{location?.name}</div>
      <div className="w-32 h-32 mx-auto">
        {selectedDay || current ? (
          !selectedDay ? (
            <img
              className="w-full hover:scale-110"
              src={current?.condition?.icon}
              alt={current?.condition?.text}
            />
          ) : (
            <img
              className="w-full hover:scale-110"
              src={selectedDay?.day?.condition?.icon}
              alt={selectedDay?.day?.condition?.text}
            />
          )
        ) : null}
      </div>
      <div className="mt-1 text-md">
        {convertDate(selectedDay ? selectedDay.date : location?.localtime)}
      </div>
      <div className="mt-1 text-4xl">
        {!selectedDay ? (
          <>{fixedNumber(current?.temp_c)}°C</>
        ) : (
          <>
            {temperatureC(
              selectedDay?.day?.mintemp_c,
              selectedDay?.day?.maxtemp_c
            )}
          </>
        )}
      </div>
      <div className="mt-1 text-xl">
        {!selectedDay
          ? current?.condition?.text
          : selectedDay?.day?.condition?.text}
      </div>
      <div className="flex justify-center">
        <img className="w-5 h-5 self-center" src={Image.WindImage} alt="Wind" />
        <div className="text-lg">
          Wind |{' '}
          {fixedNumber(
            selectedDay ? selectedDay.day.avgvis_km : current?.wind_kph
          )}{' '}
          km/h
        </div>
      </div>
      <div className="flex justify-center">
        <img
          className="w-5 h-5 self-center"
          src={Image.HumImage}
          alt="Humidity"
        />
        <div className="text-lg">
          Hum | {selectedDay ? selectedDay.day.avghumidity : current?.humidity}%
        </div>
      </div>
    </div>
  );
};

export default DayDetail;
