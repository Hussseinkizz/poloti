import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import * as HiIcons from 'react-icons/hi';

// ? import sample images
import sampleImage from '../public/images/img4.jpg';

export default function EditPostModal({ post, isOpen, closeModal }) {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [newLocation, setNewLocation] = useState(post.location);
  const [newInfo, setNewInfo] = useState(post.info);
  const [newPrice, setNewPrice] = useState(post.price);
  const [newWidth, setNewWidth] = useState(post.width);
  const [newHeight, setNewHeight] = useState(post.height);
  const [newInstallments, setNewInstallments] = useState(post.installments);
  // const [newSaleStatus, setNewSaleStatus] = useState(post.is_sold);

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
  const handlePostSave = (e) => {
    e.preventDefault();
    // ? send data to server
    // update post in supabase
    const updatePost = async () =>
      await supabase
        .from('posts')
        .update({
          width: newWidth,
          height: newHeight,
          location: newLocation,
          installments: newInstallments,
          price: newPrice,
          photos: newImages,
          info: newInfo,
        })
        .match({
          id: post.id,
        });
    updatePost();
    // ? close modal
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    <div className="w-full">
                      <div className="w-full h-60 group relative cursor-pointer flex grow">
                        <Image
                          src={sampleImage}
                          layout="fill"
                          loading="lazy"
                          objectFit="fill"
                          alt={`Image of ${post.location}`}
                          // title={title}
                          className={`w-full rounded-t-md hover:opacity-60 hover:scale-105 group-hover:scale-110 group-hover:opacity-75 transition duration-150 ease-linear ${
                            imageIsLoading
                              ? 'grayscale blur-3xl'
                              : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
                          }`}
                          onLoadingComplete={() => setImageIsLoading(false)}
                          onClick={handleImageUpload}
                        />
                        {/* The overlay content */}
                        <div className="truncate absolute z-10 font-bold flex justify-center items-end pb-2 w-full h-full text-white text-xl hover:text-orange-300 transition duration-150 ease-linear capitalize">
                          <button
                            className="text-sm sm:text-base flex justify-center  items-center gap-2 bg-gray-800 bg-opacity-20 text-gray-400 py-1 px-2 rounded-md hover:text-gray-50 hover:bg-opacity-60 active:scale-110 transition duration-150 ease-in-out"
                            onClick={handleImageUpload}
                          >
                            <HiIcons.HiCloudUpload className="text-xl md:text-2xl" />
                            <span>Tap to upload photo</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Modal Body */}
                    <section className="w-full flex flex-col justify-center items-center gap-2 px-2">
                      {/* Post Location */}
                      <div className="w-full p-2 flex flex-col justify-center items-start gap-2 grow">
                        <label
                          htmlFor="land-location"
                          className="font-semibold"
                        >
                          Where is this land located?
                        </label>
                        <div className="w-full flex grow">
                          <input
                            type="text"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                          />
                        </div>
                      </div>
                      {/* Post Info or about */}
                      <div className="w-full p-2 flex flex-col justify-center items-start gap-2 grow">
                        <label htmlFor="land-info" className="font-semibold">
                          Why would someone buy this land?
                        </label>
                        <div className="w-full flex grow">
                          <textarea
                            cols="30"
                            rows="5"
                            value={newInfo}
                            onChange={(e) => setNewInfo(e.target.value)}
                            className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                          />
                        </div>
                      </div>
                      {/* Post Price, Width & Height */}
                      <div className="w-full p-2 grid grid-cols-2 justify-evenly items-center gap-4 grow">
                        {/* Post Price */}
                        <div className="w-full flex flex-col justify-center items-start gap-2 grow">
                          <label htmlFor="land-price" className="font-semibold">
                            Price:
                          </label>
                          <div className="w-full flex grow">
                            <input
                              type="text"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {/* Post Width */}
                          <div className="w-full flex flex-col justify-center items-center gap-2 grow">
                            <label
                              htmlFor="land-width"
                              className="font-semibold"
                            >
                              Width:
                            </label>
                            <div className="w-full flex grow">
                              <input
                                type="text"
                                value={newWidth}
                                onChange={(e) => setNewWidth(e.target.value)}
                                className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate text-center"
                              />
                            </div>
                          </div>
                          {/* Post Height */}
                          <div className="w-full flex flex-col justify-center items-center gap-2 grow">
                            <label
                              htmlFor="land-height"
                              className="font-semibold"
                            >
                              Height:
                            </label>
                            <div className="w-full flex grow">
                              <input
                                type="text"
                                value={newHeight}
                                onChange={(e) => setNewHeight(e.target.value)}
                                className="grow outline-none border-gray-300 text-gray-600 relative rounded-md transition-colors hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100 truncate text-center"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Post Installments */}
                      <div className="w-full p-2 flex justify-between items-center gap-2 grow">
                        <label
                          htmlFor="land-installments"
                          className="font-semibold"
                        >
                          Do you accept kibanjampola?
                        </label>
                        <div className="flex justify-center items-center gap-4">
                          <div className="flex justify-center items-center gap-2">
                            <input
                              type="checkbox"
                              name="land-installments"
                              checked={newInstallments}
                              onChange={() => setNewInstallments(true)}
                              id="land-installments"
                              className="outline-none border-gray-300 text-gray-600 rounded-md  hover:border-gray-100 focus:border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 appearance-none border  bg-white checked:text-gray-800 checked:border-gray-700 transition cursor-pointer h-6 w-6"
                            />
                            <span>Yes</span>
                          </div>
                          <div className="flex justify-center items-center gap-2">
                            <input
                              type="checkbox"
                              name="land-installments"
                              checked={!newInstallments}
                              onChange={() => setNewInstallments(false)}
                              id="land-installments"
                              className="outline-none border-gray-300 text-gray-600 rounded-md  hover:border-gray-100 focus:border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 appearance-none border  bg-white checked:text-gray-800 checked:border-gray-700 transition cursor-pointer h-6 w-6"
                            />
                            <span>No</span>
                          </div>
                        </div>
                      </div>
                      {/* Post Tip */}
                      <h2 className="flex justify-center gap-1 items-center text-gray-400 mt-4 px-4">
                        <span className="flex text-3xl">
                          <HiIcons.HiLightBulb className="text-green-400" />
                        </span>
                        <span className="text-sm">
                          Tip: People like to know if water, shopping center and
                          electric power are near and easy to access, so tell
                          them as you explain why they should buy that land!
                        </span>
                      </h2>
                    </section>
                  </section>
                  {/* Modal Actions */}
                  <div className="flex justify-between gap-4 items-center mt-4 p-6">
                    <button
                      type="submit"
                      className="bg-orange-400 text-orange-50 flex justify-center items-center capitalize py-2 px-4 hover:bg-orange-200 hover:text-orange-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
                      onClick={handlePostSave}
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <HiIcons.HiOutlineCheck />
                      <span>save changes</span>
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

// fetch target post data
export const getServerSideProps = async (context) => {
  // Query the post by id
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', context.query.id)
    .single();

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
