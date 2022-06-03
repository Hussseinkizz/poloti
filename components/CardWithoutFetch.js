import { useState } from 'react';
import Photo from '../public/images/sample.png';
import MyPhoto from '../public/images/me.png';
import Image from 'next/image';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io5';

const Card = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex-col shadow-md bg-gray-100 border border-gray-200 rounded-md">
      {/* Card Header */}
      <div className="flex justify-between items-center p-2 mb-1">
        <div className="px-2 py-1 rounded-md border border-gray-200 uppercase font-mono font-semibold text-sm truncate">
          css framework
        </div>
        <h3 className="text-sm lg:text-base flex justify-between items-center gap-2">
          <BsIcons.BsHeartFill className="text-orange-400" />
          <span>400+ Likes</span>
        </h3>
      </div>
      {/* Card Body */}
      <a href="#" className="group">
        <div className="aspect-w-1 aspect-h-1 xl:aspect-h-8 w-full overflow-hidden">
          <div className="w-full">
            <Image
              src={Photo}
              layout="responsive"
              height={650}
              objectFit="cover"
              alt="Sample Image"
              title="tool name"
              className="group-hover:opacity-75"
            />
          </div>
          <div className="px-4">
            <div className="flex justify-between items-center">
              <h3 className="mt-4 text-lg text-gray-700 font-medium capitalize">
                Serato CSS
              </h3>
            </div>
            <p
              className="mt-1 text-sm
            text-gray-900 truncate"
            >
              Bad ass css framework for beginners, with colors and animations
              etc.
            </p>
          </div>
        </div>
      </a>
      {/* Card Footer */}
      <div className="flex p-4 justify-between items-center">
        <span>
          {isLiked ? (
            <BsIcons.BsHeartFill
              className="text-xl transition-all text-red-400 hover:text-red-500 outline-none active:text-2xl"
              onClick={() => setIsLiked(!isLiked)}
            />
          ) : (
            <BsIcons.BsHeart
              className="text-xl transition-all hover:text-red-400 outline-none active:text-2xl"
              onClick={() => setIsLiked(!isLiked)}
            />
          )}
        </span>
        <button className="px-2 py-1 bg-blue-500 rounded-sm text-blue-50 hover:bg-blue-400 transition-all border-2 active:border-blue-100 focus:border-blue-100 outline-none border-transparent hover:shadow-md">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Check it out
          </a>
        </button>
      </div>
    </div>
  );
};

export default Card;
