import { AnotherWeather } from './another-weather';
import { CurrentWeather, Forecastday } from './current-weather';
import { Current, Location } from './weather';

export interface ISelectDays {
  darkTheme: boolean;
  selectedDays: number;
  onSelectedDays: (value: number) => void;
}

export interface ILeftContainer {
  darkTheme: boolean;
  weather: CurrentWeather;
  selectedIndex: number;
  changeTheme: (value: boolean) => void;
  onSelectDay: (value: number) => void;
}

export interface IRightContainer {
  darkTheme: boolean;
  weather: CurrentWeather;
  selectedDay: Forecastday;
  onSelectCity: (value: string) => void;
  changeTheme: (value: boolean) => void;
  detectLocation: (value: boolean) => void;
  onSearchCity: (value: string) => void;
}

export interface ISearchCity {
  onDetect: (value: boolean) => void;
  onSearch: (value: string) => void;
}

export interface IChangeTheme {
  darkTheme: boolean;
  changeTheme: (value: boolean) => void;
}

export interface IWelcome {
  changeTheme: (value: boolean) => void;
}

export interface IForecastDays {
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
  forecastday: Forecastday[];
  selectedIndex: number;
  location: Location;
}

export interface IDayDetail {
  current: Current;
  selectedDay: Forecastday;
  location: Location;
}

export interface IAnotherCity {
  onSelectCity: (value: string) => void;
}

export interface IDetail {
  index: number;
  city: AnotherWeather;
  onSelect: (value: string | undefined) => void;
}
