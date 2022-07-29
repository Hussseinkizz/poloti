import { useState } from 'react';
import Link from 'next/link';
import * as HiIcons from 'react-icons/hi';
import ComponentWrapper from '../components/ComponentWrapper';
// import Loader from '../components/Loader';
import { useRouter } from 'next/router';
import { supabase } from '../supabase-client';

export default function Login() {
  // const [userContact, setUserContact] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // handle form submission
  // * handle edge case where no user account found!
  const LoginUser = async () => {
    setIsLoading(true);
    // auth in this user
    const { data, error } = await supabase.auth.signIn({
      email: userEmail,
      password: userPassword,
    });
    if (data) {
      // redirect user to home
      router.push('/');
    }
    if (error) {
      console.log(error);
    }
  };

  // handle form actions
  const handleLogin = (event) => {
    event.preventDefault();
    LoginUser();
  };
  // handle form actions
  const handleSignup = () => {
    router.push('/signup');
    // router push to signup page
  };

  return (
    <ComponentWrapper wrap={true}>
      <section className="w-full grid place-items-center p-4 py-24 md:py-16">
        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 p-2 pb-4 flex flex-col justify-center items-center gap-2 bg-gray-50 border rounded-md shadow-md mx-auto"
        >
          {/* form header */}
          <h1 className="text-gray-800 text-center text-3xl font-bold mb-4">
            Welcome Back!
          </h1>
          {/* form inputs */}
          <section className="w-full grow flex flex-col justify-center items-center gap-4">
            {/* userContact
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
            </div> */}
            {/* userEmail */}
            <div className="w-full flex grow group relative">
              <input
                type="email"
                value={userEmail}
                placeholder="Enter your email address"
                onChange={(e) => setUserEmail(e.target.value)}
                className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate pr-12"
                required
              />
              <div className="absolute top-3 right-2 text-gray-400 grid place-items-center">
                <HiIcons.HiMail className="h-4 w-4 md:h-6 md:w-6 cursor-pointer transition group-hover:text-orange-400" />
              </div>
            </div>
            {/* userPassword */}
            <div className="w-full flex grow group relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={userPassword}
                placeholder="Enter your password"
                onChange={(e) => setUserPassword(e.target.value)}
                className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate pr-12"
              />
              <div className="absolute top-3 right-2 text-gray-400 grid place-items-center">
                {showPassword ? (
                  <HiIcons.HiEye
                    className="h-4 w-4 md:h-6 md:w-6 cursor-pointer transition group-hover:text-orange-400"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <HiIcons.HiEyeOff
                    className="h-4 w-4 md:h-6 md:w-6 cursor-pointer transition group-hover:text-orange-400"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
          </section>
          {/* form actions */}
          <div className="w-full flex grow justify-center items-center gap-4 mt-2">
            <button
              type="submit"
              className="bg-orange-400 text-orange-50 flex grow justify-center items-center capitalize py-2 px-4 hover:bg-orange-200 hover:text-orange-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              {isLoading ? 'please wait...' : 'Login'}
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              onClick={handleSignup}
            >
              Signup
            </button>
          </div>
          {/* Password reset */}
          <div className="flex justify-center items-center gap-2 my-4">
            <h3 className="flex justify-start items-center gap-1 text-gray-500 text-sm md:text-base">
              <HiIcons.HiExclamationCircle className="text-gray-400" />
              <span>
                Forgot your password?
                <Link href="/password-reset" passHref>
                  <a className="text-gray-400 border-b border-transparent hover:border-orange-400 py-1 px-2">
                    reset password.
                  </a>
                </Link>
              </span>
            </h3>
          </div>
        </form>
      </section>
    </ComponentWrapper>
    // <Loader type="main-loader" />
  );
}
