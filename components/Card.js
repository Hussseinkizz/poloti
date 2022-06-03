import { Zoom } from 'react-reveal';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ user, size, location, price, image }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const { username, avatar } = user;

  let title = `${location} - ${size.width} ku ${size.height}`;

  return (
    <Zoom>
      <div className="flex-col shadow-lg bg-gray-50 rounded-t-md overflow-hidden">
        {/* Card Media */}
        <Link href="#" passHref>
          <a>
            <div className="w-full h-60 group relative cursor-pointer">
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
              <span className="truncate absolute z-10 font-bold flex justify-center items-center w-full h-full text-white text-xl hover:text-orange-300 transition duration-150 ease-linear">
                {title}
              </span>
            </div>
          </a>
        </Link>
        {/* Card Content */}
        <div className="flex flex-col gap-4">
          <div className="p-2 flex items-center justify-between gap-8">
            <div className="flex justify-start gap-2 items-center">
              <span className="w-8 h-8">
                <Image
                  src={avatar}
                  layout="responsive"
                  objectFit="contain"
                  alt={`${username} 's photo`}
                  className="rounded-full"
                />
              </span>
              <span className="text-gray-800 capitalize font-bold">
                {username}
              </span>
            </div>
            <h1 className="font-bold flex justify-between items-center">
              <span className="text-gray-700">{price} M (Shs)</span>
            </h1>
          </div>
          <Link href="#" passHref>
            <a>
              <button className="w-full bg-orange-400 text-orange-50 flex justify-center items-center uppercase font-semibold grow py-4 hover:bg-orange-200 hover:text-orange-400 duration-150 ease-in-out">
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
