import '../style.css';
import windImage from '../../assets/images/wind.svg';
import humImage from '../../assets/images/hum.svg';

const WeatherDayDetail = ({ current, selectedDay, location }: any) => {
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
        {new Date(
          selectedDay ? selectedDay.date : location?.localtime
        )?.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
        })}
      </div>
      <div className="mt-1 text-4xl">
        {!selectedDay ? (
          <>{current?.temp_c?.toFixed(0)}°C</>
        ) : (
          <>
            {selectedDay?.day?.mintemp_c?.toFixed(0)}°C -{' '}
            {selectedDay?.day?.maxtemp_c?.toFixed(0)}°C
          </>
        )}
      </div>
      <div className="mt-1 text-xl">
        {!selectedDay
          ? current?.condition?.text
          : selectedDay?.day?.condition?.text}
      </div>
      <div className="flex justify-center">
        <img className="w-5 h-5 self-center" src={windImage} alt="Wind" />
        <div className="text-lg">
          Wind |{' '}
          {(selectedDay
            ? selectedDay.day.avgvis_km
            : current?.wind_kph
          )?.toFixed(0)}{' '}
          km/h
        </div>
      </div>
      <div className="flex justify-center">
        <img className="w-5 h-5 self-center" src={humImage} alt="Humidity" />
        <div className="text-lg">
          Hum | {selectedDay ? selectedDay.day.avghumidity : current?.humidity}%
        </div>
      </div>
    </div>
  );
};

export default WeatherDayDetail;
