import { ImSpinner4 } from 'react-icons/im';
import Fade from 'react-reveal/Fade';

const Loader = ({ type, id }) => {
  return (
    <section className="w-full min-h-custom grid place-items-center">
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <Fade top>
          <ImSpinner4 className="h-6 w-6 animate-spin" />
        </Fade>
        {/* <h1 className="animate-pulse">
          Poloti {type === 'land' ? 'Land' : 'User'}
          <span className="text-orange-400 px-2">{id}</span> is Loading...
        </h1> */}
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
