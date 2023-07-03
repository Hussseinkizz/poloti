import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as HiIcons from 'react-icons/hi';
import { useNumberFormat } from '../hooks/useNumberFormat';
import { getPublicUrl } from '../supabase-client';

// import placeholder
import placeholder from '../public/images/placeholder.jpeg';
import CheckboxGroup from './CheckboxGroup';

const UserPostCard = ({
  post,
  handlePostEdit,
  handlePostDelete,
  checkHandler,
}) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  const {
    id,
    user_id,
    width,
    height,
    location,
    price,
    image1_url,
    installments,
    is_sold,
  } = post;

  return (
    <div className="w-full flex flex-col shadow-lg bg-gray-50 rounded-md overflow-hidden justify-between items-stretch grow">
      {/* Card Media */}
      <Link
        href={`/land/${id}`}
        passHref
      >
        <a data-mdb-ripple="true">
          <div className="w-full h-60 group relative cursor-pointer flex grow">
            <Image
              src={image1_url ? getPublicUrl(image1_url) : placeholder}
              layout="fill"
              loading="lazy"
              objectFit="fill"
              alt={`Image of ${location}`}
              // title={title}
              className={`w-full rounded-t-md hover:opacity-60 hover:scale-105 group-hover:scale-110 group-hover:opacity-75 transition duration-150 ease-linear ${
                imageIsLoading
                  ? 'grayscale blur-3xl'
                  : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
              }`}
              onLoadingComplete={() => setImageIsLoading(false)}
            />
            {/* The overlay content */}
            <div className="truncate absolute z-10 font-bold flex justify-center items-center w-full h-full text-white text-xl hover:text-orange-300 transition duration-150 ease-linear capitalize">
              <span className="rounded-md bg-black bg-opacity-20 px-4 py-2">{`${location} - ${width} ku ${height}`}</span>
            </div>
          </div>
        </a>
      </Link>
      {/* Card Content */}
      <div className="flex flex-col justify-between gap-4 grow">
        <div className="p-2 flex items-center justify-between gap-8">
          <h1 className="font-bold flex justify-between items-center sm:text-sm md:text-base w-full">
            <span className="text-gray-700">
              Price: {useNumberFormat(price)}
            </span>
            <span className="text-gray-600">
              {installments ? 'Kibanjampola' : 'Full price'}
            </span>
          </h1>
        </div>
        {/* Card Actions */}
        <section className="w-full flex justify-center items-center grow p-2 rounded-md ">
          <div className="w-full flex flex-col justify-center items-center grow gap-4 rounded-md border p-2">
            <div className="w-full flex justify-between items-center grow gap-2">
              <h2 className="text-gray-700 font-semibold capitalize">
                <span>Land still available?</span>
              </h2>
              <CheckboxGroup
                checkStatus={!is_sold}
                handleCheckStatus={(check) => checkHandler({ check, id })}
              />
            </div>
            {/* Card Buttons */}
            <div className="w-full flex justify-center items-center grow gap-2">
              <button
                className="w-full bg-red-400 text-red-50 flex justify-center items-center capitalize grow py-2 hover:bg-red-200 hover:text-red-400 active:scale-95 transition duration-150 ease-in-out gap-1 rounded-md"
                onClick={() => handlePostDelete(id)}
              >
                <HiIcons.HiTrash />
                <span>delete</span>
              </button>
              <button
                className="w-full bg-green-400 text-green-50 flex justify-center items-center capitalize grow py-2 hover:bg-green-200 hover:text-green-400 active:scale-95 transition duration-150 ease-in-out gap-1 rounded-md"
                onClick={() => handlePostEdit(id)}
              >
                <HiIcons.HiPencilAlt />
                <span>edit</span>
              </button>
              <button className="w-full flex grow">
                <Link
                  href={`/land/${id}`}
                  passHref
                >
                  <a className="w-full bg-orange-400 text-orange-50 flex justify-center items-center capitalize grow py-2 hover:bg-orange-200 hover:text-orange-400 active:scale-95 transition duration-150 ease-in-out gap-1 rounded-md">
                    <HiIcons.HiEye />
                    <span>view</span>
                  </a>
                </Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPostCard;
