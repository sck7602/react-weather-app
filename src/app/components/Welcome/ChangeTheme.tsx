import { IChangeTheme } from '../../models/weather-app';
import Image from '../Common/Image';

const ChangeTheme = ({ darkTheme, changeTheme }: IChangeTheme) => {
  function changeDarkTheme(status: boolean) {
    if (!changeTheme) {
      return;
    }

    changeTheme(status);
  }

  return (
    <div
      className={`${
        !darkTheme ? 'bg-button-light' : 'bg-button-dark'
      } bg-button-dark w-24 h-10 rounded-full flex justify-center items-center max-lg:self-center`}
    >
      <button
        className="flex-1 rounded-full hover:scale-110"
        title="Change light UI"
        onClick={() => changeDarkTheme(false)}
      >
        <div
          className={`p-0.5 mx-auto w-fit rounded-full ${
            !darkTheme ? 'bg-button-night' : ''
          }`}
        >
          <img className="w-6 mx-auto" src={Image.LightImage} alt="Light" />
        </div>
      </button>
      <button
        className="flex-1 rounded-full hover:scale-110"
        title="Change dark UI"
        onClick={() => changeDarkTheme(true)}
      >
        <div
          className={`p-0.5 mx-auto w-fit rounded-full ${
            darkTheme ? 'bg-button-night' : ''
          }`}
        >
          <img
            className="w-6 mx-auto"
            src={darkTheme ? Image.NightImage : Image.NightBlackImage}
            alt="Night"
          />
        </div>
      </button>
    </div>
  );
};

export default ChangeTheme;
