import { useState } from 'react';
import { BiImageAdd, BiImageAlt, BiImages } from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import Image from 'next/image';
// import { useImagePreview } from '../hooks/useImagePreview';

const ModalHeader = ({
  imageSelected,
  handleImagesUpload,
  handleImageChange,
  formError,
  uploadImagesRef,
  imageUrl,
}) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  // if (imageSelected) {
  //   return (
  //     <div className="w-full">
  //       <div className="w-full h-60 group relative cursor-pointer flex grow">
  //         <Image
  //           src={imageUrl}
  //           layout="fill"
  //           loading="lazy"
  //           objectFit="fill"
  //           alt="Image selected by you!"
  //           // title={title}
  //           className={`w-full rounded-t-md hover:opacity-60 hover:scale-105 group-hover:scale-110 group-hover:opacity-75 transition duration-150 ease-linear ${
  //             imageIsLoading
  //               ? 'grayscale blur-3xl'
  //               : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
  //           }`}
  //           onLoadingComplete={() => setImageIsLoading(false)}
  //           onClick={handleImagesUpload}
  //         />
  //         {/* The overlay content */}
  //         <div className="truncate absolute z-10 font-bold flex justify-center items-end pb-2 w-full h-full text-white text-xl hover:text-orange-300 transition duration-150 ease-linear capitalize">
  //           <button
  //             className="text-sm sm:text-base flex justify-center  items-center gap-2 bg-gray-800 bg-opacity-20 text-gray-400 py-1 px-2 rounded-md hover:text-gray-50 hover:bg-opacity-60 active:scale-110 transition duration-150 ease-in-out"
  //             onClick={handleImagesUpload}
  //           >
  //             <HiIcons.HiCloudUpload className="text-xl md:text-2xl" />
  //             <span>Tap to upload photo</span>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div
      id="#modal-header"
      className="w-full h-60 relative cursor-pointer flex flex-col justify-center  items-center gap-2 grow bg-gray-400 bg-svg-pattern bg-opacity-25"
    >
      {!imageSelected ? (
        <BiImageAdd
          className="text-5xl text-gray-500"
          onClick={handleImagesUpload}
        />
      ) : (
        <BiImages
          className="text-5xl text-orange-400"
          onClick={handleImagesUpload}
        />
      )}
      <button
        className={`text-sm sm:text-base flex justify-center  items-center gap-2  bg-opacity-20 py-1 px-2 rounded-md hover:bg-opacity-60 active:scale-110 transition duration-150 ease-in-out ${
          formError !== 'image-error'
            ? 'bg-gray-800 text-gray-800 hover:text-gray-50'
            : 'bg-red-400 text-red-400 hover:text-red-50'
        }`}
        onClick={handleImagesUpload}
      >
        {imageSelected ? 'Change uploaded photos' : 'Tap to upload photos'}
      </button>
      {/* Image upload ref actual input */}
      <input
        type="file"
        multiple={true}
        accept={'image/jpeg image/png'}
        onChange={(event) => handleImageChange(event)}
        ref={uploadImagesRef}
        className="hidden"
      />
    </div>
  );
};

export default ModalHeader;
