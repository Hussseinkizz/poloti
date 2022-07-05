import Appbar from './Appbar';
import DesktopMenu from './DesktopMenu';
// import Meta from './Meta';
import { useStore } from '../hooks/useStore';
import * as HiIcons from 'react-icons/hi';
import * as FaIcons from 'react-icons/fa';
import { useSession } from '../utils/user-context';
import Link from 'next/link';

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
      <main onClick={closeNav} className="bg-gray-100  pb-8">
        {children}
      </main>

      {/* The Footer */}
      <footer className="relative w-full flex-col items-center justify-center text-center border-gray-200 border-t bg-gray-800 py-6 md:py-8">
        {/* Navigate up button link */}
        <a
          href="#top"
          className="absolute -top-3 md:-top-4 w-full flex items-center justify-center"
        >
          <HiIcons.HiArrowNarrowUp
            className="h-6 w-6 md:h-8 md:w-8 p-1 text-gray-200 hover:shadow-md rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 duration-150 ease-linear"
            aria-hidden="true"
          />
        </a>
        <section className="w-3/4 md:w-1/2 mx-auto grow flex justify-between md:justify-center items-center gap-2 py-2 pb-12 border-b border-gray-700 md:gap-10">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-xl text-orange-400 font-bold tracking-wide uppercase font-mono">
              Poloti.com
            </h1>
            <div className="flex justify-center items-center gap-4">
              <a
                href="https://facebook.com/poloti"
                className="p-2 rounded-full grid place-items-center bg-gray-700 hover:bg-orange-200 group border border-gray-700 transition"
              >
                <FaIcons.FaFacebook className="h-4 w-4 text-gray-500 group-hover:text-orange-400" />
              </a>
              <a
                href="https://instagram.com/poloti"
                className="p-2 rounded-full grid place-items-center bg-gray-700 hover:bg-orange-200 group border border-gray-700 transition"
              >
                <FaIcons.FaInstagram className="h-4 w-4 text-gray-500 group-hover:text-orange-400" />
              </a>
              <a
                href="https://twitter.com/poloti"
                className="p-2 rounded-full grid place-items-center bg-gray-700 hover:bg-orange-200 group border border-gray-700 transition"
              >
                <FaIcons.FaTwitter className="h-4 w-4 text-gray-500 group-hover:text-orange-400" />
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">
            <h2 className="text-xl text-gray-400 font-bold tracking-wide capitalize font-mono">
              Useful Links
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-start gap-1 md:gap-4">
              <Link href="/about" passHref>
                <a className="text-gray-500 hover:text-orange-400">About Us</a>
              </Link>
              <Link href="/contact" passHref>
                <a className="text-gray-500 hover:text-orange-400">
                  Contact Us
                </a>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-start gap-1 md:gap-4">
              <Link href="/privacy-pollicy" passHref>
                <a className="text-gray-500 hover:text-orange-400">
                  Privacy Pollicy
                </a>
              </Link>
              <Link href="/sitemap" passHref>
                <a className="text-gray-500 hover:text-orange-400">Sitemap</a>
              </Link>
            </div>
          </div>
        </section>
        <section className="text-sm">
          <h4 className="text-gray-700 flex items-center justify-center gap-2 mt-1 md:mt-2">
            Platform Designed And Developed By
            <a
              className="flex items-center justify-center hover:font-semibold transition ease-linear-linear text-gray-600 hover:text-orange-400"
              href="mailto:hssnkizz@gmail.com"
            >
              <span>
                <HiIcons.HiExternalLink />
              </span>
              <span>Kizz</span>
            </a>
          </h4>
          <h3 className="text-gray-700">
            All rights reserved. &copy; Poloti.com 2022.
          </h3>
        </section>
      </footer>
    </>
  );
};

export default Layout;
