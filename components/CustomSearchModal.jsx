import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useRef } from 'react';
// import Image from 'next/image';

import * as HiIcons from 'react-icons/hi';
import { BiImageAdd } from 'react-icons/bi';

// ? import sample images
// import sampleImage from '../public/images/img4.jpg';

// TODO: use Form actions to send user form to admin email,

export default function CustomSearchModal({ isOpen, closeModal }) {
  // const [imageIsLoading, setImageIsLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  {/* Modal Content */}
                  <section className="w-full">
                    {/* Modal Header */}
                    <div className="w-full flex flex-col justify-center items-center text-center gap-2 mt-12 md:mt-8 mb-4">
                      <h1 className="font-bold text-lg">olina ly'onoonya?</h1>
                      <p className="text-sm md:text-base px-1/4">
                        our agents will try looking for your specifications{' '}
                        <br /> and we will get back to you soonest!
                      </p>
                    </div>
                    {/* Modal Body */}
                    <section className="w-full flex flex-col justify-center items-center gap-2 px-2">
                      {/* user fullnames */}
                      <div className="w-full p-2 flex flex-col justify-center items-start gap-2 grow">
                        <label
                          htmlFor="user-fullname"
                          className="font-semibold"
                        >
                          Your Full Names
                        </label>
                        <div className="w-full flex grow">
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                            required
                          />
                        </div>
                      </div>
                      {/* user contact */}
                      <div className="w-full p-2 flex flex-col justify-center items-start gap-2 grow">
                        <label
                          htmlFor="user-contact"
                          className="font-semibold"
                        >
                          Your Contact
                        </label>
                        <div className="w-full flex grow">
                          <input
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                            required
                          />
                        </div>
                      </div>
                      {/* user email */}
                      <div className="w-full p-2 flex flex-col justify-center items-start gap-2 grow">
                        <label
                          htmlFor="user-email"
                          className="font-semibold"
                        >
                          Your Email (Optional)
                        </label>
                        <div className="w-full flex grow">
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                          />
                        </div>
                      </div>
                      {/* user massage */}
                      <div className="w-full p-2 flex flex-col justify-center items-start gap-2 grow">
                        <label
                          htmlFor="user-massage"
                          className="font-semibold"
                        >
                          What exactly do you want?
                        </label>
                        <div className="w-full flex grow">
                          <textarea
                            cols="30"
                            rows="5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                            required
                          />
                        </div>
                      </div>
                      {/* Modal Tip */}
                      <h2 className="flex justify-center gap-1 items-center text-gray-400 mt-4 px-4">
                        <span className="flex text-3xl">
                          <HiIcons.HiLightBulb className="text-green-400" />
                        </span>
                        <span className="text-sm">
                          Tip: tell us what you really want, what size, what
                          location, what price and what not, the whole imbox is
                          yours!
                        </span>
                      </h2>
                    </section>
                  </section>
                  {/* Modal Actions */}
                  <div className="flex justify-between gap-4 items-center mt-4 p-6">
                    <button
                      type="submit"
                      className=" bg-orange-400 text-orange-50 flex justify-center items-center capitalize py-2 px-4 hover:bg-orange-200 hover:text-orange-400 active:scale-95 transition duration-150 ease-in-out gap-1 rounded-md"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <HiIcons.HiOutlineCheck />
                      <span>submit</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
