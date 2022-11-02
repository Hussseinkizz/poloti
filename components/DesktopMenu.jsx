import Link from 'next/link';
import * as HiIcons from 'react-icons/hi';
import Menu from '../components/Menu';
import { useStore } from '../hooks/useStore';

const DesktopMenu = ({ session }) => {
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
    <header className="bg-gray-800 text-white shadow-md w-full hidden _show-on-md">
      <nav className="flex items-center justify-between px-4 py-2 w-full">
        {/* Nav Right, for menu & brand */}
        <div className="relative flex items-center justify-evenly px-4 gap-4">
          <button
            type="button"
            className="inline-flex items-center p-1 text-white text-sm hover:text-orange-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={toggleNav}>
            <span className="sr-only">Open main menu</span>
            {showNav ? (
              <HiIcons.HiX className="w-6 h-6 icon" />
            ) : (
              <HiIcons.HiOutlineMenuAlt4 className="w-6 h-6 icon" />
            )}
          </button>
          {/* Nav Brand */}
          <Link href="/" passHref>
            <a className="font-bold font-mono text-xl hover:text-orange-100 transition-colors">
              Poloti.com
            </a>
          </Link>
        </div>
        {/* Nav Action Right */}
        <div>
          {session ? (
            <Link href={`/user/${session.user?.id}/dashboard`} passHref>
              <a
                className="flex items-center justify-center text-orange-50 rounded-md bg-orange-400 hover:bg-orange-500 hover:text-orange-100 active:scale-95 transition duration-150 ease-in-out text:sm sm:text-base w-full px-2 py-1 text-center"
                // target="_blank"
              >
                <span>Post Your Land Now</span>
              </a>
            </Link>
          ) : (
            <Link href="/signup" passHref>
              <a className="flex items-center justify-center text-orange-50 rounded-md bg-orange-400 hover:bg-orange-500 hover:text-orange-100 active:scale-95 transition duration-150 ease-in-out text:sm sm:text-base w-full px-2 py-1 text-center">
                <span>Sell Your Land Now</span>
              </a>
            </Link>
          )}
        </div>
      </nav>
      {showNav && <Menu session={session} />}
    </header>
  );
};

export default DesktopMenu;
