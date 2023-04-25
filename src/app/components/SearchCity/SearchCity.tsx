import { ISearchCity } from '@/app/models';
import ThemeContext from '@/app/store/theme-context';
import { useContext } from 'react';
import Image from '@/app/models/image';

const SearchCity = ({ onDetect, onSearch }: ISearchCity) => {
  const themeContext = useContext(ThemeContext);
  const onSearchCity = (event: any) => {
    const textSearch = event.target.value.trim();

    if (textSearch) {
      onSearch(textSearch);
      event.target.value = '';
    }
  };

  const onDetectLocation = (value: boolean) => {
    if (!onDetect) {
      return;
    }

    onDetect(value);
  };

  return (
    <>
      <input
        className={`shadow-sm w-full h-10 pl-2 outline-1 outline-indigo-600 rounded-lg hover:shadow-md hover:shadow-indigo-800 hover:text-md duration-300 ${
          themeContext.darkTheme
            ? 'bg-search-city text-white'
            : 'bg-search-city-light text-black'
        }`}
        type="text"
        placeholder="Search city..."
        onBlur={onSearchCity}
        onKeyUp={(e) => e.key === 'Enter' && onSearchCity(e)}
      />
      <button
        className="w-12 hover:scale-110"
        title="Detect location"
        onClick={() => onDetectLocation(true)}
      >
        <img className="mx-auto" src={Image.LocationImage} alt="Location" />
      </button>
    </>
  );
};

export default SearchCity;
