import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useRef, useEffect } from 'react';
import { useSession } from '../utils/user-context';
import { supabase } from '../supabase-client';
import { useRouter } from 'next/router';
import * as HiIcons from 'react-icons/hi';

// * outline
// - recreate component
// - upload photos, get first one and preview it, however delete from db on cancel

// ? import sample images
import sampleImage from '../public/images/img4.jpg';
import ModalHeader from './ModalHeader';
// import { useImagePreview } from '../hooks/useImagePreview';

export default function CreatePostModal({ isOpen, closeModal }) {
  const [newLocation, setNewLocation] = useState('');
  const [newInfo, setNewInfo] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newWidth, setNewWidth] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newInstallments, setNewInstallments] = useState(true);

  // * Logic state
  const [formError, setFormError] = useState('clear');
  const [uploadPercent, setUploadPercent] = useState(0);
  const [progressWidth, setProgressWidth] = useState('w-fit');
  const [imageSelected, setImageSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  // get current user
  const { user } = useSession().session;
  // let user = {
  //   id: 1,
  // };

  // next router
  // const router = useRouter();

  // handle image uploading
  // TODO: preview image?
  const imagesRef = useRef([]);
  const images = imagesRef.current;
  let targetImage = useRef(null);
  // let previewUrlRef = useRef(null);
  const uploadImagesRef = useRef();

  const handleImagesUpload = () => {
    uploadImagesRef.current.click();
  };

  // * select images from device 1 by 1
  // add image to selected images array
  // check if file name already exists and alert else still add to array
  // check if array length is already 4 and alert if max limit else  add to array
  // show selection count in UI
  // should not submit form if images are less than 4

  const handleImageChange = (event) => {
    const fileList = event.target.files;
    const selectedFiles = [...fileList];
    const selectedImage = event.target.files[0];
    const selectedImages = imagesRef.current;

    function findDuplicates(arr) {
      const seen = new Set();
      const duplicates = arr.filter((n) => seen.size === seen.add(n).size);
      return duplicates;
    }

    if (selectedFiles && selectedFiles.length > 1) {
      // * use multiple selection
      const selectedImagesNames = selectedFiles.map((file) => file.name);
      const duplicates = findDuplicates(selectedImagesNames);
      console.log('duplicates:', duplicates);
      if (duplicates.length === 0) {
        // add selection to imagesRef
        selectedImages.push(selectedImage);
        setImageSelected(true);
        setFormError('clear');
        // show selection count in UI
      } else {
        alert(
          `There ${duplicates.length} selected, please select unique Images!`
        );
      }
    } else if (selectedFiles && selectedFiles.length <= 1) {
      // * use single selection handler
      if (selectedImages && selectedImages.length < 4) {
        // check if image already exists
        const selectedImagesNames = selectedImages.map((file) => file.name);
        const alreadyAdded = selectedImagesNames.includes(selectedImage.name);
        if (!alreadyAdded) {
          selectedImages.push(selectedImage);
          console.log('Images:', selectedImages);
          setImageSelected(true);
          setFormError('clear');
          // show selection count in UI
        }
        if (alreadyAdded) {
          alert('alert already added');
        }
      } else {
        alert('Please provide atleast 4 images maximum!');
      }
    } else {
      // * alert 4 max limit
      alert('Please provide atleast 4 images maximum!');
    }
  };
  console.log('ImagesRef:', imagesRef.current);

  // handle form submission
  const handleForm = async (event) => {
    event.preventDefault();
    if (images && images.length === 4) {
      // * handle form...
      if (imageSelected) {
        setLoading(true);
        // upload post photos to storage...
        // * upload image 1
        let image1 = images[0];
        const { data: image1Data, error: image1Error } = await supabase.storage
          .from('post_images')
          .upload(`${Date.now()}_${image1.name}`, image1);
        const image1Url = image1Data.Key;

        // update image upload UI progress indicator
        if (image1Data) {
          console.log('Image1data', image1Data);
          setProgressWidth('w-2/5');
          setUploadPercent(25);
        } else {
          throw new error(image1Error.message);
        }
        // * upload image 2
        let image2 = images[1];
        const { data: image2Data, error: image2Error } = await supabase.storage
          .from('post_images')
          .upload(`${Date.now()}_${image2.name}`, image2);
        const image2Url = image2Data.Key;

        // update image upload UI progress indicator
        if (image2Data) {
          setProgressWidth('w-1/2');
          setUploadPercent(50);
        } else {
          throw new error(image2Error.message);
        }
        // * upload image 3
        let image3 = images[2];
        const { data: image3Data, error: image3Error } = await supabase.storage
          .from('post_images')
          .upload(`${Date.now()}_${image3.name}`, image3);
        const image3Url = image3Data.Key;

        // update image upload UI progress indicator
        if (image3Data) {
          setProgressWidth('w-3/4');
          setUploadPercent(75);
        } else {
          throw new error(image3Error.message);
        }
        // * upload image 4
        let image4 = images[3];
        const { data: image4Data, error: image4Error } = await supabase.storage
          .from('post_images')
          .upload(`${Date.now()}_${image4.name}`, image4);
        const image4Url = image4Data.Key;

        // * Then finally create post in supabase db...
        if (image4Data) {
          const { data, error } = await supabase.from('posts').insert({
            user_id: user.id,
            width: newWidth,
            height: newHeight,
            location: newLocation,
            installments: newInstallments,
            price: newPrice,
            info: newInfo,
            image1_url: image1Url,
            image2_url: image2Url,
            image3_url: image3Url,
            image4_url: image4Url,
          });
          if (data) {
            setProgressWidth('w-full');
            setUploadPercent(100);
            closeModal();
          } else {
            throw new error(error.message);
          }
        } else {
          throw new error(image4Error.message);
        }
      } else {
        setFormError('image-error');
      }
    } else {
      alert('Please provide atleast 4 images maximum!');
    }
  };

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

          <div className="overflow-y-auto fixed inset-0">
            <div className="flex justify-center items-center p-4 min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="overflow-hidden w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all transform">
                  {/* Modal Content */}
                  <section className="w-full">
                    <ModalHeader
                      imageSelected={imageSelected}
                      imageSelectedCount={images.length}
                      // imageUrl={imageUrlRef.current}
                      imageUrl={sampleImage}
                      handleImageChange={handleImageChange}
                      handleImagesUpload={handleImagesUpload}
                      formError={formError}
                      uploadImagesRef={uploadImagesRef}
                    />
                    {/* Modal Body */}
                    <form
                      className="flex flex-col gap-2 justify-center items-center px-2 w-full"
                      onSubmit={handleForm}
                    >
                      {/* Post Location */}
                      <div className="flex flex-col gap-2 justify-center items-start p-2 w-full grow">
                        <label
                          htmlFor="land-location"
                          className="font-semibold"
                        >
                          Where is this land located?
                        </label>
                        <div className="flex w-full grow">
                          <input
                            type="text"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            className="relative text-gray-600 truncate rounded-md border-gray-300 transition-colors outline-none grow hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100"
                            required
                          />
                        </div>
                      </div>
                      {/* Post Info or about */}
                      <div className="flex flex-col gap-2 justify-center items-start p-2 w-full grow">
                        <label
                          htmlFor="land-info"
                          className="font-semibold"
                        >
                          Why would someone buy this land?
                        </label>
                        <div className="flex w-full grow">
                          <textarea
                            cols="30"
                            rows="5"
                            value={newInfo}
                            onChange={(e) => setNewInfo(e.target.value)}
                            className="w-full flex flex-wrap break-words relative text-gray-600 rounded-md border-gray-300 transition-colors outline-none grow hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100"
                            required
                          />
                        </div>
                      </div>
                      {/* Post Price, Width & Height */}
                      <div className="grid grid-cols-2 gap-4 justify-evenly items-center p-2 w-full grow">
                        {/* Post Price */}
                        <div className="flex flex-col gap-2 justify-center items-start w-full grow">
                          <label
                            htmlFor="land-price"
                            className="font-semibold"
                          >
                            Price:
                          </label>
                          <div className="flex w-full grow">
                            <input
                              type="text"
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              className="relative text-gray-600 truncate rounded-md border-gray-300 transition-colors outline-none grow hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {/* Post Width */}
                          <div className="flex flex-col gap-2 justify-center items-center w-full grow">
                            <label
                              htmlFor="land-width"
                              className="font-semibold"
                            >
                              Width:
                            </label>
                            <div className="flex w-full grow">
                              <input
                                type="text"
                                value={newWidth}
                                onChange={(e) => setNewWidth(e.target.value)}
                                className="relative text-center text-gray-600 truncate rounded-md border-gray-300 transition-colors outline-none grow hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100"
                                required
                              />
                            </div>
                          </div>
                          {/* Post Height */}
                          <div className="flex flex-col gap-2 justify-center items-center w-full grow">
                            <label
                              htmlFor="land-height"
                              className="font-semibold"
                            >
                              Height:
                            </label>
                            <div className="flex w-full grow">
                              <input
                                type="text"
                                value={newHeight}
                                onChange={(e) => setNewHeight(e.target.value)}
                                className="relative text-center text-gray-600 truncate rounded-md border-gray-300 transition-colors outline-none grow hover:bg-white focus:border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-100"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Post Installments */}
                      <div className="flex gap-2 justify-between items-center p-2 w-full grow">
                        <label
                          htmlFor="land-installments"
                          className="font-semibold"
                        >
                          Do you accept kibanjampola?
                        </label>
                        <div className="flex gap-4 justify-center items-center">
                          <div className="flex gap-2 justify-center items-center">
                            <input
                              type="checkbox"
                              name="land-installments"
                              checked={newInstallments}
                              onChange={() => setNewInstallments(true)}
                              id="land-installments"
                              className="w-6 h-6 text-gray-600 bg-white rounded-md border border-gray-300 transition appearance-none cursor-pointer outline-none hover:border-gray-100 focus:border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 checked:text-gray-800 checked:border-gray-700"
                            />
                            <span>Yes</span>
                          </div>
                          <div className="flex gap-2 justify-center items-center">
                            <input
                              type="checkbox"
                              name="land-installments"
                              checked={!newInstallments}
                              onChange={() => setNewInstallments(false)}
                              id="land-installments"
                              className="w-6 h-6 text-gray-600 bg-white rounded-md border border-gray-300 transition appearance-none cursor-pointer outline-none hover:border-gray-100 focus:border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 checked:text-gray-800 checked:border-gray-700"
                            />
                            <span>No</span>
                          </div>
                        </div>
                      </div>
                      {/* Post Tip */}
                      <h2 className="flex gap-1 justify-center items-center px-4 mt-4 text-gray-400">
                        <span className="flex text-3xl">
                          <HiIcons.HiLightBulb className="text-green-400" />
                        </span>
                        <span className="text-sm">
                          Tip: People like to know if water, shopping center and
                          electric power are near and easy to access, so tell
                          them as you explain why they should buy that land!
                        </span>
                      </h2>
                      {/* Modal Actions */}
                      <div className="flex gap-4 justify-between items-center p-6 mt-4 w-full">
                        <button
                          type="submit"
                          className="flex gap-1 justify-center items-center px-4 py-2 text-orange-50 capitalize bg-orange-400 rounded-md transition duration-150 ease-in-out hover:bg-orange-200 hover:text-orange-400 active:scale-95"
                        >
                          {!loading && <HiIcons.HiOutlineCheck />}
                          <span>
                            {loading ? 'please wait...' : 'post land'}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded-md border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          cancel
                        </button>
                      </div>
                    </form>
                    {/* Image upload progress bar,w-fit, w-2/5, w-1/2,w-3/4, w-full */}
                    {uploadPercent !== 0 && (
                      <div className="w-full bg-green-50">
                        <div
                          className={`px-4 text-sm text-center text-green-400 bg-green-100 rounded-r-lg animate-pulse ${progressWidth}`}
                        >
                          uploading images {uploadPercent}%
                        </div>
                      </div>
                    )}
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
