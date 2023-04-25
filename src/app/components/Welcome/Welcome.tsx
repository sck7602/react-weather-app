import { IWelcome } from '@/app/models';
import ThemeContext from '@/app/store/theme-context';
import { useContext } from 'react';
import Clock from '../Common/Clock';
import Session from '../Common/Session';
import ChangeTheme from '../Welcome/ChangeTheme';

const Welcome = ({ changeTheme }: IWelcome) => {
  const themeContext = useContext(ThemeContext);
  const changeDarkTheme = (status: boolean) => {
    changeTheme(status);
  };

  const convertDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div className="flex max-lg:mb-3">
      <div className="w-full">
        <div
          className={`text-4xl font-semibold max-lg:hidden ${
            !themeContext.darkTheme && 'text-blue-light'
          }`}
        >
          <Clock />
        </div>
        <div className="text-lg font-semibold max-lg:hidden">
          {convertDate(new Date())}
        </div>
        <div
          className={`text-2xl font-semibold mt-3 max-lg:mt-0 ${
            !themeContext.darkTheme && 'text-blue-light'
          }`}
        >
          <Session />
        </div>
      </div>
      <ChangeTheme
        darkTheme={themeContext.darkTheme}
        changeTheme={changeDarkTheme}
      />
    </div>
  );
};

export default Welcome;
