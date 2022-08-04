import Image from 'next/image';
import { Zoom, Fade } from 'react-reveal';
import { useState } from 'react';
import Link from 'next/link';
import * as HiIcons from 'react-icons/hi';
import { supabase } from '../supabase-client';

// ? import sample images
import sampleImage from '../public/images/img4.jpg';

const DashboardPosts = ({ posts, handlePostEdit, handlePostDelete }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [isSold, setIsSold] = useState(null);

  const handlePostSoldYes = async (targetID) => {
    await supabase
      .from('posts')
      .update({
        is_sold: true,
      })
      .match({
        id: targetID,
      });
    // change post sale status to true!
    // do nothing if already true
    // do this server side, or client side firstly if possible!
  };
  const handlePostSoldNo = async (targetID) => {
    await supabase
      .from('posts')
      .update({
        is_sold: false,
      })
      .match({
        id: targetID,
      });
  };

  // Prices formatting function
  const priceFormat = (value) => {
    let digitCount = value.toString().length;
    // console.log(digitCount);

    if (digitCount >= 7 && digitCount <= 10) {
      return `${value / 1000000} M`;
    }
    if (digitCount >= 10 && digitCount <= 12) {
      return `${value / 1000000000} B`;
    }
    // if (digitCount <= 6) {
    //   return `${value / 1000} K`;
    // }
    return `${value / 1000} K`;
  };

  if (posts.length === 0) {
    return (
      <Fade bottom>
        <div className="w-full sm:w-1/2 md:w-3/4 border bg-gray-100 p-4 py-16 mx-auto rounded-md shadow-md">
          <h1 className="text-center text-gray-400  truncate flex flex-col justify-center gap-2 items-center">
            <HiIcons.HiExclamationCircle className="text-2xl md:text-3xl" />
            <span className="text-sm sm:text-base">
              You have no posts for now, post some now!
            </span>
          </h1>
        </div>
      </Fade>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 relative z-0">
      {posts?.map((post, index) => (
        <Zoom key={index}>
          <div
            key={post.id}
            className="w-full flex flex-col shadow-lg bg-gray-50 rounded-md overflow-hidden justify-between items-stretch grow"
          >
            {/* Card Media */}
            <Link href={`/land/${post.id}`} passHref>
              <a data-mdb-ripple="true">
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
                  />
                  {/* The overlay content */}
                  <div className="truncate absolute z-10 font-bold flex justify-center items-center w-full h-full text-white text-xl hover:text-orange-300 transition duration-150 ease-linear capitalize">
                    <span className="rounded-md bg-black bg-opacity-20 px-4 py-2">{`${post.location} - ${post.width} ku ${post.height}`}</span>
                  </div>
                </div>
              </a>
            </Link>
            {/* Card Content */}
            <div className="flex flex-col justify-between gap-4 grow">
              <div className="p-2 flex items-center justify-between gap-8">
                <h1 className="font-bold flex justify-between items-center sm:text-sm md:text-base w-full">
                  <span className="text-gray-700">
                    Price: {priceFormat(post.price)}
                  </span>
                  <span className="text-gray-600">
                    {post.installments ? 'Kibanjampola' : 'Full price'}
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
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className={` flex justify-center items-center capitalize  active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md px-2 ${
                          !post.is_sold
                            ? 'bg-gray-800 text-gray-100 hover:bg-gray-600 hover:text-gray-400'
                            : 'bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-500'
                        }`}
                        onClick={() => handlePostSoldYes(post.id)}
                      >
                        <HiIcons.HiCheck />
                        <span>Yes</span>
                      </button>
                      <button
                        className={` flex justify-center items-center capitalize  active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md px-2 ${
                          post.is_sold
                            ? 'bg-gray-800 text-gray-100 hover:bg-gray-600 hover:text-gray-400'
                            : 'bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-500'
                        }`}
                        onClick={() => handlePostSoldNo(post.id)}
                      >
                        <HiIcons.HiX />
                        <span>No</span>
                      </button>
                    </div>
                  </div>
                  {/* Card Buttons */}
                  <div className="w-full flex justify-center items-center grow gap-2">
                    <button
                      className="w-full bg-red-400 text-red-50 flex justify-center items-center capitalize grow py-2 hover:bg-red-200 hover:text-red-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
                      onClick={() => handlePostDelete(post.id)}
                    >
                      <HiIcons.HiTrash />
                      <span>delete</span>
                    </button>
                    <button
                      className="w-full bg-green-400 text-green-50 flex justify-center items-center capitalize grow py-2 hover:bg-green-200 hover:text-green-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md"
                      onClick={() => handlePostEdit(post.id)}
                    >
                      <HiIcons.HiPencilAlt />
                      <span>edit</span>
                    </button>
                    <button className="w-full flex grow">
                      <Link href={`/land/${post.id}`} passHref>
                        <a className="w-full bg-orange-400 text-orange-50 flex justify-center items-center capitalize grow py-2 hover:bg-orange-200 hover:text-orange-400 active:scale-110 transition duration-150 ease-in-out gap-1 rounded-md">
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
        </Zoom>
      ))}
    </section>
  );
};

export default DashboardPosts;
