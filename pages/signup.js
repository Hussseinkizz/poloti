import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as HiIcons from 'react-icons/hi';
import ComponentWrapper from '../components/ComponentWrapper';
// import Loader from '../components/Loader';
import { useRouter } from 'next/router';

// TODO: also create a unique nanoid for each new post or it's auto by the db!

export default function signup() {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAvatar, setUseAvatar] = useState({});

  const router = useRouter();

  // handle image uploading
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setImageIsLoading(false);
    };
  };

  // handle form submission
  const CreateUser = (user) => {
    console.log(user);
    // ?create user in supabase
  };

  // handle form actions
  const handleSignup = (e) => {
    e.preventDefault();
    // ? send data to server
    createUser('user');
  };
  // handle form actions
  const handleLogin = () => {
    router.push('/login');
    // router push to login page
  };

  return (
    <ComponentWrapper wrap={true}>
      <section className="w-full grid place-items-center p-4 py-24 md:py-16">
        <form className="w-full md:w-1/2 p-2 pb-4 flex flex-col justify-center items-center gap-2 bg-gray-50 border rounded-md shadow-md mx-auto">
          {/* form header */}
          <h1 className="text-gray-800 text-center text-3xl font-bold mb-4">
            Sign up
          </h1>
          {/* form inputs */}
          <section className="w-full grow flex flex-col justify-center items-center gap-4">
            {/* userName */}
            <div className="w-full flex grow relative group">
              <input
                type="text"
                value={userName}
                placeholder="Enter your full name"
                onChange={(e) => setUserName(e.target.value)}
                className="grow outline-none border-gray-300 text-gray-600 rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate relative pr-12"
                required
              />
              <div className="absolute top-3 right-2 text-gray-400 grid place-items-center">
                <HiIcons.HiUser className="h-4 w-4 md:h-6 md:w-6 cursor-pointer transition group-hover:text-orange-400" />
              </div>
            </div>
            {/* userContact */}
            <div className="w-full flex grow group relative">
              <input
                type="text"
                value={userContact}
                placeholder="Enter your phone number"
                onChange={(e) => setUserContact(e.target.value)}
                className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate pr-12"
                required
              />
              <div className="absolute top-3 right-2 text-gray-400 grid place-items-center">
                <HiIcons.HiPhone className="h-4 w-4 md:h-6 md:w-6 cursor-pointer transition group-hover:text-orange-400" />
              </div>
            </div>
            {/* userEmail */}
            <div className="w-full flex grow group relative">
              <input
                type="email"
                value={userEmail}
                placeholder="Enter your email address"
                onChange={(e) => setUserEmail(e.target.value)}
                className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate pr-12"
              />
              <div className="absolute top-3 right-2 text-gray-400 grid place-items-center">
                <HiIcons.HiMail className="h-4 w-4 md:h-6 md:w-6 cursor-pointer transition group-hover:text-orange-400" />
              </div>
            </div>
            {/* userPassword */}
            <div className="w-full flex grow group relative">
              <input
                type="password"
                value={userPassword}
                placeholder="Enter new password"
                onChange={(e) => setUserPassword(e.target.value)}
                className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate pr-12"
              />
              <div className="absolute top-3 right-2 text-gray-400 grid place-items-center">
                <HiIcons.HiEyeOff className="h-4 w-4 md:h-6 md:w-6 cursor-pointer transition group-hover:text-orange-400" />
              </div>
            </div>
          </section>
          {/* form actions */}
          <div className="w-full flex grow justify-center items-center gap-4 mt-2">
            <button
              type="submit"
              className="bg-orange-400 text-orange-50 flex grow justify-center items-center capitalize py-2 px-4 hover:bg-orange-200 hover:text-orange-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
              onClick={handleSignup}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign up
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          {/* Terms & Conditions */}
          <div className="flex justify-center items-center gap-2 my-4">
            <input
              type="checkbox"
              name="terms-and-conditions"
              checked="true"
              id="terms-and-conditions"
              className="outline-none focus:outline-none rounded-md   appearance-none border  bg-white checked:text-gray-500 checked:border-gray-300 cursor-pointer h-4 w-4"
            />
            <h3 className="text-gray-500 text-sm md:text-base">
              By signing up you agree to poloti.com's
              <Link href="/terms-and-conditions" passHref>
                <a className="text-gray-400 border-b border-transparent hover:border-orange-400 py-1 px-2">
                  terms and conditions
                </a>
              </Link>
            </h3>
          </div>
        </form>
      </section>
    </ComponentWrapper>
    // <Loader type="main-loader" />
  );
}
