import { ImSpinner4 } from 'react-icons/im';
import Fade from 'react-reveal/Fade';

const Loader = ({ type, id }) => {
  if (type === 'main-loader') {
    return (
      <section className="w-full min-h-custom grid place-items-center">
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <Fade top>
            <ImSpinner4 className="h-6 w-6 animate-spin" />
          </Fade>
          <h1 className="animate-pulse">Loading...</h1>
        </div>
      </section>
    );
  }
  if (type === 'dashboard-loader') {
    return (
      <section className="w-full min-h-custom grid place-items-center">
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <Fade top>
            <ImSpinner4 className="h-6 w-6 animate-spin" />
          </Fade>
          <h1 className="animate-pulse">Your Dashboard is Loading...</h1>
          {type === 'warning' && (
            <p className="text-red-400 px-2 text-sm">
              But there might be problem loading dashborad for user: ${id}
            </p>
          )}
        </div>
      </section>
    );
  }
  if (type === 'loader') {
    return (
      <section className="w-full h-32 sm:h-48 md:h-52 grid place-items-center">
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center text-gray-400">
          <Fade top>
            <ImSpinner4 className="h-6 w-6 animate-spin" />
          </Fade>
          <h2 className="animate-pulse text-sm">Loading...</h2>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full min-h-custom grid place-items-center">
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <Fade top>
          <ImSpinner4 className="h-6 w-6 animate-spin" />
        </Fade>
        <h1 className="animate-pulse">
          Poloti
          <span className="px-1">{type === 'land' ? 'Land' : 'User'}</span>
          is Loading...
        </h1>
        {type === 'warning' && (
          <p className="text-red-400 px-2 text-sm">
            But there might be problem loading ${id}
          </p>
        )}
      </div>
    </section>
  );
};

export default Loader;
