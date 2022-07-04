// 🚯 My Code Recycle Bin
import { useState, useEffect } from 'react';
import { Zoom } from 'react-reveal';
import Image from 'next/image';
import * as BsIcons from 'react-icons/bs';
import usePreview from '../hooks/usePreview';
import Link from 'next/link';

const Card = ({ tool }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [imageIsLoading, setImageIsLoading] = useState(true);

  let { name, category, likes, caption, url } = tool;
  let image = usePreview(url);

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  // Toggle like button and increment or decrement like respectively
  // todo: persist state on reload using coockies and local storage!
  const handleLiking = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  return (
    <Zoom>
      <div className="flex-col shadow-md bg-gray-50 border border-gray-200 rounded-md">
        {/* Card Body */}
        <Link href={url} passHref>
          <a className="group" target="_blank">
            <div className="aspect-w-1 aspect-h-1 xl:aspect-h-8 w-full overflow-hidden aspect-auto">
              <div className="w-full">
                <Image
                  src={image}
                  layout="responsive"
                  loading="lazy"
                  height={35}
                  width={50}
                  objectFit="fill"
                  alt={`Screenshot of ${name}`}
                  title={name}
                  className={`group-hover:opacity-75 rounded-t-md ${
                    imageIsLoading
                      ? 'grayscale blur-3xl'
                      : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
                  }`}
                  onLoadingComplete={() => setImageIsLoading(false)}
                />
              </div>
              <div className="px-4">
                <div className="flex justify-between items-center my-2">
                  <h3 className="text-gray-700 font-medium capitalize">
                    {name}
                  </h3>
                  <h2 className="px-2 py-1 rounded-md border border-gray-200 uppercase font-mono font-semibold text-sm truncate">
                    {category}
                  </h2>
                </div>
                <p
                  className="mt-1 text-sm
            text-gray-900 truncate"
                >
                  {caption}
                </p>
              </div>
            </div>
          </a>
        </Link>
        {/* Card Footer */}
        <div className="flex p-4 justify-between items-center">
          <div className="flex gap-2 justify-between items-center">
            <span>
              {isLiked ? (
                <BsIcons.BsHeartFill
                  className="text-xl transition-all text-orange-400 hover:text-orange-500 outline-none active:text-2xl"
                  onClick={handleLiking}
                />
              ) : (
                <BsIcons.BsHeart
                  className="text-xl transition-all hover:text-orange-400 outline-none active:text-2xl"
                  onClick={handleLiking}
                />
              )}
            </span>
            <span className="text-sm lg:text-base flex justify-between items-center gap-2">
              <span>{likes > 500 ? '100+ Likes' : likeCount}</span>
            </span>
          </div>
          <button className="px-2 py-1 bg-blue-500 rounded-sm text-blue-50 hover:bg-blue-400 transition-all border-2 outline-none border-transparent hover:shadow-md active:scale-95 duration-150 ease-in-out">
            <a href={url} target="_blank" rel="noopener noreferrer">
              Check it out
            </a>
          </button>
        </div>
      </div>
    </Zoom>
  );
};

export default Card;
