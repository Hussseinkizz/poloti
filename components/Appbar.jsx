import Link from 'next/link';
import * as HiIcons from 'react-icons/hi';
import Menu from './Menu';
import { useStore } from '../hooks/useStore';

const Appbar = ({ session }) => {
  // const darkModeChangeHandler = () => {
  //   dispatch({
  //     type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON',
  //   });
  //   // use js-cookie package to persist darkmode value in browser after refresh, yarn add js-cookie and uncomment the codeblocks below!
  //   // const newDarkMode = !darkMode;
  //   // Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  // };

  // const { darkMode } = state;

  const { state, setState } = useStore();

  const { showNav } = state;

  // toggle nav menu
  const toggleNav = () => {
    setState({
      type: 'TOGGLE_NAV',
    });
  };

  return (
    <header className="bg-gray-800 text-white shadow-md w-full _fixed-on-mobile md:hidden">
      <nav className="flex items-center justify-between px-4 py-2 ">
        {/* Nav Right, for menu */}
        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center p-1 text-white text-sm hover:text-orange-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={toggleNav}
          >
            <span className="sr-only">Open main menu</span>
            {showNav ? (
              <HiIcons.HiX className="w-6 h-6 icon" />
            ) : (
              <HiIcons.HiOutlineMenuAlt4 className="w-6 h-6 icon" />
            )}
          </button>
          {/* Menu, For Non Mobile */}
          {/* <DesktopMenu /> */}
        </div>
        {/* Nav Middle, for Brand */}
        <Link href="/" passHref>
          <a className="font-bold font-mono text-xl hover:text-orange-100 transition-colors">
            Poloti.com
          </a>
        </Link>
        {/* Nav Action Right */}
        <div>
          {session ? (
            <Link href={`/${session.user?.id}/dashboard`} passHref>
              <a className="flex space-x-2 place-items-center text-orange-50 py-1 px-2 rounded-md bg-gradient-to-r from-orange-300 via-orange-300 to-orange-400 hover:text-orange-100 active:scale-110 transition duration-150 ease-in-out">
                <span>Post Land</span>
              </a>
            </Link>
          ) : (
            <Link href="/signup" passHref>
              <a className="flex space-x-2 place-items-center text-orange-50 py-1 px-2 rounded-md bg-gradient-to-r from-orange-300 via-orange-300 to-orange-400 hover:text-orange-100 active:scale-110 transition duration-150 ease-in-out">
                <span>Sell Land</span>
              </a>
            </Link>
          )}
        </div>
      </nav>
      {showNav && <Menu session={session} />}
    </header>
  );
};

export default Appbar;
