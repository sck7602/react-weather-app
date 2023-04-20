import { LocationWeather } from './current-weather';
import { Current, Forecastday, Weather } from './weather';

export interface ISelectDays {
  darkTheme: boolean;
  selectedDays: number;
  onSelectedDays: (value: number) => void;
}

export interface ILeftContainer {
  darkTheme: boolean;
  weather: Weather;
  selectedIndex: number;
  changeTheme: (value: boolean) => void;
  onSelectDay: (value: number) => void;
}

export interface IRightContainer {
  darkTheme: boolean;
  weather: Weather;
  selectedDay: Forecastday;
  onSelectCity: (value: string) => void;
  changeTheme: (value: boolean) => void;
  detectLocation: (value: boolean) => void;
  onSearchCity: (value: string) => void;
}

export interface ISearchCity {
  darkTheme: boolean;
  onDetect: (value: boolean) => void;
  onSearch: (value: string) => void;
}

export interface IChangeTheme {
  darkTheme: boolean;
  changeTheme: (value: boolean) => void;
}

export interface IWelcome {
  darkTheme: boolean;
  changeTheme: (value: boolean) => void;
}

export interface IForecastDays {
  darkTheme: boolean;
  forecastday: Forecastday[];
  selectDay: (value: number) => void;
}

export interface IDay {
  item: Forecastday;
  index: number;
  indexDay: number;
  darkTheme: boolean;
  onSelect: (value: number) => void;
}

export interface IHourChart {
  categoryTimes: string[];
  tempRange: number[];
  darkTheme: boolean;
  locationName: string;
}

export interface IForecastHourly {
  darkTheme: boolean;
  forecastday: Forecastday[];
  selectedIndex: number;
  location: Location;
}

export interface IDayDetail {
  current: Current;
  selectedDay: Forecastday;
  location: Location;
}

export interface IWeatherAnotherCity {
  onSelectCity: (value: string) => void;
}

export interface IDetail {
  index: number;
  city: LocationWeather;
  onSelect: (value: string | undefined) => void;
}
