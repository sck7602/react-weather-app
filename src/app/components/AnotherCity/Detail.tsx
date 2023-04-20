import { IDetail } from '../../models/weather-app';
import Image from '../Common/Image';

const Detail = ({ index, city, onSelect }: IDetail) => {
  const onSelectCities = (cityName: string | undefined) => {
    if (!onSelect) {
      return;
    }

    onSelect(cityName);
  };

  return (
    <div
      key={index}
      className={`${
        index === 0
          ? 'bg-card-sub-one shadow-md shadow-rose-500/50'
          : 'bg-card-sub-two shadow-md shadow-orange-500/50'
      } bg-card-sub-one shadow-md shadow-rose-500/50 rounded-xl mt-5 p-5 h-24 flex justify-stretch hover:scale-105`}
      onClick={() => onSelectCities(city.location?.name)}
    >
      <div className="w-1/2 text-left self-center">
        <div className="flex">
          <img
            className="w-5 h-5 self-center"
            src={Image.WindImage}
            alt="Wind"
          />
          <div className="text-sm">Wind | {city.current?.wind_kph}km/h</div>
        </div>
        <div className="flex">
          <img className="w-5 h-5 self-center" src={Image.HumImage} alt="Hum" />
          <div className="text-sm">Hum | {city.current?.humidity}%</div>
        </div>
      </div>
      <div className="w-1/2 text-right self-center">
        <div className="text-sm">{city.location?.name}</div>
        <div className="flex w-full justify-end">
          <img
            className="w-10 h-10 self-center"
            src={city.current?.condition.icon}
            alt={city.current?.condition.text}
          />
          <div className="text-lg self-center">{city.current?.temp_c}°C</div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
