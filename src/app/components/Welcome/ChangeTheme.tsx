import lightImage from '../../../assets/images/light.svg';
import nightImage from '../../../assets/images/night.svg';
import nightBlackImage from '../../../assets/images/night-black.svg';

const ChangeTheme = ({ darkTheme, changeTheme }: any) => {
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
  );
};

export default ChangeTheme;
