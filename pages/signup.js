import { useState, useRef } from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import * as HiIcons from 'react-icons/hi';
import ComponentWrapper from '../components/ComponentWrapper';
// import Loader from '../components/Loader';
import { useRouter } from 'next/router';
import { supabase } from '../supabase-client';

export default function Signup() {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [userAvatarUrl, setUserAvatarUrl] = useState('');

  const router = useRouter();

  // handle image uploading
  // TODO: preview image before upload,
  // * handle form errors such as username or email already exists etc?
  const uploadInputRef = useRef();

  const handleImageUpload = () => {
    uploadInputRef.current.click();
  };

  /* handle form submission
  then create user in supabase profiles table */
  const CreateUser = async () => {
    setLoading(true);
    // auth up this user & create user profile
    const { user, error } = await supabase.auth.signUp(
      {
        email: userEmail,
        password: userPassword,
      },
      {
        data: {
          user_name: userName,
          user_email: userEmail,
          user_contact: userContact,
        },
      }
    );
    if (user) {
      // upload user avatar
      const { data: avatarData, avatarError } = await supabase.storage
        .from('avatars')
        .upload(`${Date.now()}_${userAvatar.name}`, userAvatar);
      const avatarUrl = avatarData.Key;

      // update user avatar url in db
      if (avatarData) {
        await supabase.from('profiles').upsert({
          id: user.id,
          avatar_url: avatarUrl,
        });
      } else {
        throw new error(avatarError.message);
      }
    }

    // handle auth error
    if (error) {
      console.log(error);
    }
    // redirect user to home or persist signup screen!
    user ? router.push('/') : setLoading(false);
  };

  // handle form actions
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userAvatar) {
      CreateUser();
      setSubmissionFailed(false);
    } else {
      setSubmissionFailed(true);
    }
  };

  // handle form actions
  const handleLogin = () => {
    router.push('/login');
    // router push to login page
  };

  return (
    <ComponentWrapper wrap={true}>
      <section className="w-full grid place-items-center p-4 py-24 md:py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-2 pb-4 flex flex-col justify-center items-center gap-2 bg-gray-50 border rounded-md shadow-md mx-auto"
        >
          {/* form header */}
          <h1 className="text-gray-800 text-center text-3xl font-bold mb-4">
            Sign up
          </h1>
          {/* user avatar upload widget */}
          <section className="w-full grow flex flex-col md:flex-row justify-center items-center mb-2 gap-2 md:gap-4">
            <div
              className="group grid place-items-center border border-gray-400 hover:border-orange-400 text-gray-600 transition bg-white hover:bg-orange-100  rounded-full relative p-8 md:p-6"
              onClick={handleImageUpload}
            >
              <span>
                {userAvatar ? (
                  <HiIcons.HiCheck className="h-8 w-8 md:h-10 md:w-10 cursor-pointer transition group-hover:text-orange-300 text-orange-400" />
                ) : (
                  <HiIcons.HiPlus className="h-8 w-8 md:h-10 md:w-10 cursor-pointer transition group-hover:text-orange-400 text-gray-300" />
                )}
              </span>
              {/* Image upload ref actual input */}
              <input
                type="file"
                accept={'image/jpeg image/png'}
                onChange={(event) => setUserAvatar(event.target.files[0])}
                ref={uploadInputRef}
                className="hidden"
              />
            </div>
            <button className="text-sm truncate">
              {!userAvatar ? (
                <span
                  className={
                    submissionFailed
                      ? 'text-red-400 font-semibold'
                      : 'text-gray-200'
                  }
                >
                  upload photo
                </span>
              ) : (
                <span className="text-orange-400">{userAvatar.name}</span>
              )}
            </button>
          </section>
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
                type={showPassword ? 'text' : 'password'}
                value={userPassword}
                placeholder="Enter new password"
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
              // onClick={handleSubmit}
            >
              {loading ? 'please wait...' : 'Sign up'}
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
              checked={true}
              readOnly
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
