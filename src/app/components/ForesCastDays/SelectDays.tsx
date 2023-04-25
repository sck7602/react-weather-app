import { ISelectDays } from '@/app/models';

const SelectDays = ({
  darkTheme,
  selectedDays,
  onSelectedDays,
}: ISelectDays) => {
  const days = [5, 6, 7, 8, 9, 10];
  const handleSelect = (event: any) => {
    if (!onSelectedDays) {
      return;
    }

    onSelectedDays(Number(event.target.value));
  };

  return (
    <select
      id="days"
      onChange={handleSelect}
      className={`h-8 self-center shadow-sm outline-1 rounded-lg ${
        darkTheme
          ? 'bg-card-flex shadow-indigo-500/50 outline-indigo-600 border border-indigo-700'
          : 'bg-card-flex-light'
      }`}
      value={selectedDays}
    >
      {days.map((item) => (
        <option key={item} value={item}>
          {item} days
        </option>
      ))}
    </select>
  );
};

export default SelectDays;
