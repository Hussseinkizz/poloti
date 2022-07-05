import { useState } from 'react';
import * as HiIcons from 'react-icons/hi';
import ComponentWrapper from '../components/ComponentWrapper';
// import Loader from '../components/Loader';

export default function contact() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userFeedback, setUserFeedback] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  // TODO: send form data to admin email!
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  return (
    <ComponentWrapper wrap={true}>
      <section className="w-full grid place-items-center p-4 py-24 md:py-16">
        <form className="w-full md:w-1/2 p-2 pb-4 flex flex-col justify-center items-center gap-2 bg-gray-50 border rounded-md shadow-md mx-auto">
          {/* form header */}
          <h1 className="text-gray-800 text-center text-2xl font-bold">
            Contact Us
          </h1>
          <p className="text-gray-700 text-center text-xl font-semibold mb-4 pb-1 border-b">
            We reply within 24hrs or sooner!
          </p>
          {/* form inputs */}
          <section className="w-full grow flex flex-col justify-center items-center gap-2">
            {/* User Name */}
            <div className="w-full p-2 flex flex-col justify-center items-start gap-2 grow">
              <label htmlFor="username" className="font-semibold">
                Your Full Name?
              </label>
              <div className="w-full flex grow">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                  required
                />
              </div>
            </div>
            {/* User Email */}
            <div className="w-full p-2 flex flex-col justify-center items-start gap-2 grow">
              <label htmlFor="useremail" className="font-semibold">
                Your Email Adrress?
              </label>
              <div className="w-full flex grow">
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                  required
                />
              </div>
            </div>
            {/* User Feedback */}
            <div className="w-full p-2 flex flex-col justify-center items-start gap-2 grow">
              <label htmlFor="feedback" className="font-semibold">
                Your suggestions or inquiries?
              </label>
              <div className="w-full flex grow">
                <textarea
                  cols="30"
                  rows="5"
                  value={userFeedback}
                  onChange={(e) => setUserFeedback(e.target.value)}
                  className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                  required
                />
              </div>
            </div>
          </section>
          {/* form actions */}
          <div className="w-full flex grow justify-center items-center gap-4 mt-2">
            <button
              type="submit"
              className="bg-orange-400 text-orange-50 flex grow justify-center items-center capitalize py-2 px-4 hover:bg-orange-200 hover:text-orange-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
              onClick={handleSubmit}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Send feedback
            </button>
          </div>
          {/* Thank you note */}
          {showThankYou && (
            <div className="flex justify-center items-center gap-2 my-4">
              <HiIcons.HiBadgeCheck className="text-gray-400" />
              <h3 className="text-gray-500 text-sm md:text-base">
                {`Thank you for your feedback ${userName}`}
              </h3>
            </div>
          )}
        </form>
      </section>
    </ComponentWrapper>
    // <Loader type="main-loader" />
  );
}
