import { IDay } from '@/app/models';

const Day = ({ item, index, indexDay, darkTheme, onSelect }: IDay) => {
  const handleSelect = (index: number) => {
    if (!onSelect) {
      return;
    }
    onSelect(index);
  };

  const temperatureC = (min: number | undefined, max: number | undefined) =>
    min && max && min.toFixed(0) + '°C - ' + max.toFixed(0) + '°C';

  const convertDate = (value: string | undefined) =>
    value &&
    item?.date &&
    new Date(item.date).toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
    });

  return (
    <div
      key={index}
      className={`h-36 max-sm:h-20 shadow-sm shadow-indigo-500/50 rounded-xl p-2 cursor-pointer text-center max-sm:flex max-sm:w-full sm:w-[150px] 2xl:flex-1 ${
        darkTheme
          ? 'bg-card-flex hover:bg-card-flex-hover'
          : 'bg-card-flex-light hover:bg-card-flex-light-hover'
      } ${indexDay === index && darkTheme && 'bg-card-active'}
        ${indexDay === index && !darkTheme && 'bg-card-active-light'}`}
      onClick={() => handleSelect(index)}
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
        <div className="text-xs">{convertDate(item.date)}</div>
        {item.day && (
          <div className="text-2xs">
            {temperatureC(item.day.mintemp_c, item.day.maxtemp_c)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;
