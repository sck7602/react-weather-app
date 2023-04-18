import Clock from './Clock';
import Session from './Session';
import '../style.css';
import lightImage from '../../assets/images/light.svg';
import nightImage from '../../assets/images/night.svg';
import nightBlackImage from '../../assets/images/night-black.svg';

const WelcomeHeaderComponent = ({ darkTheme, changeTheme }: any) => {
  const currentDay = new Date();

  function changeDarkTheme(status: boolean) {
    changeTheme(status);
  }

  return (
    <div className="flex max-lg:mb-3">
      <div className="w-full">
        <div
          className={`text-4xl font-semibold max-lg:hidden ${
            !darkTheme ? 'text-blue-light' : ''
          }`}
        >
          <Clock />
        </div>
        <div className="text-lg font-semibold max-lg:hidden">
          {currentDay &&
            new Date(currentDay).toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
        </div>
        <div
          className={`text-2xl font-semibold mt-3 max-lg:mt-0 ${
            !darkTheme ? 'text-blue-light' : ''
          }`}
        >
          <Session />
        </div>
      </div>
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
            <img className="w-6 mx-auto" src={lightImage} alt="Light" />
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
              src={darkTheme ? nightImage : nightBlackImage}
              alt="Night"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default WelcomeHeaderComponent;
