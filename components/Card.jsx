import { Zoom } from 'react-reveal';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import usePriceFormat from '../hooks/usePriceFormat';

// import sample user avatar
import avatar from '../public/images/me.png';

const Card = ({ post, image }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  // const { username, avatar } = user;
  const { user_id, user_name: username } = post;
  const { id, width, height, location, price, photos, installments } = post;

  let title = `${location} - ${width} ku ${height}`;

  return (
    <Zoom>
      <div className="flex flex-col shadow-lg bg-gray-50 rounded-t-md overflow-hidden justify-between items-stretch grow">
        {/* Card Media */}
        <Link href={`/land/${id}`} passHref>
          <a>
            <div className="w-full h-60 group relative cursor-pointer flex grow">
              <Image
                src={image}
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
              <div className="truncate capitalize absolute z-10 font-bold flex justify-center items-center w-full h-full text-white text-lg md:text-xl hover:text-orange-300 transition duration-150 ease-linear">
                <span className='rounded-md bg-black bg-opacity-20 px-4 py-2'>{title}</span>
              </div>
            </div>
          </a>
        </Link>
        {/* Card Content */}
        <div className="flex flex-col justify-between gap-4 grow">
          <div className="p-2 flex items-center justify-between gap-8">
            <Link href={`/user/${user_id}`} passHref>
              <a className="flex justify-start gap-2 items-center cursor-pointer group">
                <span className="w-8 h-8">
                  <Image
                    src={avatar}
                    layout="responsive"
                    objectFit="contain"
                    alt={`${username} 's photo`}
                    className="rounded-full group-hover:opacity-85"
                  />
                </span>
                <span className="text-gray-800 group-hover:text-gray-600 capitalize font-bold sm:text-sm md:text-base truncate group-hover:border-b hover:border-gray-600 transition">
                  {username}
                </span>
              </a>
            </Link>
            <h1 className="font-bold flex flex-col justify-between items-center sm:text-sm md:text-base">
              <span className="text-gray-700">{usePriceFormat(price)}</span>
              <span className="text-green-400">
                {installments ? 'Kibanjampola' : 'Full price'}
              </span>
            </h1>
          </div>
          <Link href={`/land/${id}`} passHref>
            <a>
              <button className="w-full bg-orange-400 text-orange-50 flex justify-center items-center uppercase font-semibold grow py-2 md:py-4 hover:bg-orange-200 hover:text-orange-400 duration-150 ease-in-out">
                buy this land
              </button>
            </a>
          </Link>
        </div>
      </div>
    </Zoom>
  );
};

export default Card;
