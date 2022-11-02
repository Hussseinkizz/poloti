import * as IoIcons from 'react-icons/io5';
import * as HiIcons from 'react-icons/hi';
import Fade from 'react-reveal/Fade';
import Link from 'next/link';
import { useStore } from '../hooks/useStore';
import { supabase } from '../supabase-client';

const Menu = ({ session }) => {
  const { setState } = useStore();

  // close nav menu on item selection
  const onSelect = () => {
    setState({
      type: 'CLOSE_NAV',
    });
  };

  return (
    <>
      <Fade left>
        {/* <div className="fixed z-50 px-2 py-4 bg-orange-500 text-white rounded left-2 top-14 text-base shadow-lg"> */}
        <div className="fixed z-50 px-2 py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-700 text-white rounded left-2 top-14 text-base shadow-lg">
          <Link href="/" passHref>
            <a
              className="flex space-x-2 place-items-center hover:bg-gray-400 hover:text-gray-50 transition-colors p-1 rounded-md"
              onClick={onSelect}>
              <span>
                <HiIcons.HiHome />
              </span>
              <span>Home</span>
            </a>
          </Link>
          <Link href="/about" passHref>
            <a
              className="flex space-x-2 place-items-center hover:bg-gray-400 hover:text-gray-50 transition-colors p-1 rounded-md"
              onClick={onSelect}>
              <span>
                <HiIcons.HiExclamationCircle />
              </span>
              <span>About</span>
            </a>
          </Link>
          <Link href="/contact" passHref>
            <a
              className="flex space-x-2 place-items-center hover:bg-gray-400 hover:text-gray-50 transition-colors p-1 rounded-md"
              onClick={onSelect}>
              <span>
                <HiIcons.HiMail />
              </span>
              <span>Contact</span>
            </a>
          </Link>
          <Link href="https://facebook.com/poloti" passHref>
            <a
              className="flex space-x-2 place-items-center hover:bg-gray-400 hover:text-gray-50 transition-colors p-1 rounded-md"
              target="_blank"
              onClick={onSelect}>
              <span>
                <IoIcons.IoLogoFacebook />
              </span>
              <span>Facebook Page</span>
            </a>
          </Link>
          {/* Divider */}
          {/* <div className="w-full h-1 bg-gray-50 rounded-md my-2" /> */}
          <div className="w-full border-b border-gray-50 rounded-md my-2" />
          <div>
            {session ? (
              <Link href="/" passHref>
                <a
                  className="flex space-x-2 place-items-center text-orange-50 py-1 px-2 rounded-md bg-gradient-to-r from-orange-400 via-orange-400 to-orange-500 hover:text-orange-100 active:scale-95 transition duration-150 ease-in-out"
                  onClick={() => {
                    supabase.auth.signOut();
                    // router.replace('/signin');
                    onSelect();
                  }}>
                  <span>
                    <IoIcons.IoPerson />
                  </span>
                  <span>Sign Out</span>
                </a>
              </Link>
            ) : (
              <Link href="/signup" passHref>
                <a
                  className="flex space-x-2 place-items-center text-orange-50 py-1 px-2 rounded-md bg-gradient-to-r from-orange-300 via-orange-300 to-orange-400 hover:text-orange-100 active:scale-95 transition duration-150 ease-in-out"
                  onClick={onSelect}>
                  <span>
                    <IoIcons.IoPerson />
                  </span>
                  <span>Signup or Login</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </Fade>
    </>
  );
};

export default Menu;
