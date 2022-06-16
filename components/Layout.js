import Appbar from './Appbar';
import DesktopMenu from './DesktopMenu';
// import Meta from './Meta';
import { useStore } from '../hooks/useStore';
import * as HiIcons from 'react-icons/hi';

const Layout = ({ children }) => {
  // const { darkMode } = state;

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
      <Appbar />
      <DesktopMenu />

      {/* The Main View */}
      <main onClick={closeNav} className="bg-gray-100">
        {children}
      </main>

      {/* The Footer */}
      <footer className="flex-col items-center justify-center text-center mb-2 border-gray-200 border-t bg-gray-50 py-4">
        {/* Navigate up button link */}
        <HiIcons.HiArrowNarrowUp
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <h4 className="text-gray-500">
          Made With 💖 By
          <a
            href="mailto:hssnkizz@gmail.com"
            className="text-orange-500 mx-1 hover:font-semibold"
          >
            Kizz
          </a>
        </h4>
        <h3>All rights reserved. &copy; Poloti.com 2022.</h3>
      </footer>
    </>
  );
};

export default Layout;
