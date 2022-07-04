import Appbar from './Appbar';
import DesktopMenu from './DesktopMenu';
// import Meta from './Meta';
import { useStore } from '../hooks/useStore';
import * as HiIcons from 'react-icons/hi';
import { useSession } from '../utils/user-context';

const Layout = ({ children }) => {
  // const { darkMode } = state;

  const { session } = useSession();

  const { state, setState } = useStore();

  const { showNav } = state;

  // close nav menu on main click
  const closeNav = () => {
    showNav &&
      setState({
        type: 'CLOSE_NAV',
      });
  };

  return (
    <>
      {/* <Meta /> */}
      {/* The Header, mobile & desktop */}
      <Appbar session={session} />
      <DesktopMenu session={session} />
      <div id="#top" />
      {/* The Main View */}
      <main onClick={closeNav} className="bg-gray-100 pb-8">
        {children}
      </main>

      {/* The Footer */}
      <footer className="relative w-full flex-col items-center justify-center text-center mb-2 border-gray-200 border-t bg-gray-50 py-6 md:py-8">
        {/* Navigate up button link */}
        <a
          href="#top"
          className="absolute -top-3 md:-top-4 w-full flex items-center justify-center"
        >
          <HiIcons.HiArrowNarrowUp
            className="h-6 w-6 md:h-8 md:w-8 p-1 text-gray-400 hover:shadow-md rounded-md border border-gray-200 bg-gray-100 duration-150 ease-linear"
            aria-hidden="true"
          />
        </a>
        <h4 className="text-gray-500 flex items-center justify-center gap-2 mt-1 md:mt-2">
          Platform Designed And Developed By
          <a
            className="flex items-center justify-center hover:font-semibold transition ease-linear-linear"
            href="mailto:hssnkizz@gmail.com"
          >
            <span>
              <HiIcons.HiExternalLink />
            </span>
            <span>Kizz</span>
          </a>
        </h4>
        <h3>All rights reserved. &copy; Poloti.com 2022.</h3>
      </footer>
    </>
  );
};

export default Layout;
