import { Zoom } from 'react-reveal';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import usePriceFormat from '../hooks/usePriceFormat';
import CardsGrid from './CardsGrid';

const UserScreen = ({ user }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  return (
    <section className="mx-auto py-16 sm:py-18 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* User Profile */}
      <div className="flex flex-col justify-center gap-2 items-center py-2 sm:pt-4 border-b border-gray-400 pb-2 mb-4">
        <span className="w-24 sm:32 h-24 sm:32">
          <Image
            src={user.avatar}
            layout="responsive"
            objectFit="contain"
            alt={`${user.username} 's photo`}
            className="rounded-full"
          />
        </span>
        <div className="flex justify-center items-center text-gray-800 capitalize font-bold text-xl sm:text-2xl md:text-3xl gap-2">
          {user.username}
        </div>
        <h1 className="font-semibold flex justify-center items-center gap-2">
          <span>Posted:</span>
          <span>
            {user.posts.length > 1
              ? `Posted Over ${user.posts.length} plots`
              : 'only 1 plot so far!'}
          </span>
        </h1>
      </div>
      {/* user posts */}
      <CardsGrid>
        {user.posts.map((post) => (
          <Zoom>
            <div className="flex flex-col shadow-lg bg-gray-50 rounded-t-md overflow-hidden justify-between items-stretch grow">
              {/* Card Media */}
              <Link href={`/land/${post.id}`} passHref>
                <a>
                  <div className="w-full h-60 group relative cursor-pointer flex grow">
                    <Image
                      src={post.photos[0]}
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
                    <div className="truncate absolute z-10 font-bold flex justify-center items-center w-full h-full text-white text-xl hover:text-orange-300 transition duration-150 ease-linear">
                      <span>{`${post.location} - ${post.size.width} ku ${post.size.height}`}</span>
                    </div>
                  </div>
                </a>
              </Link>
              {/* Card Content */}
              <div className="flex flex-col justify-between gap-4 grow">
                <div className="p-2 flex items-center justify-between gap-8">
                  <h1 className="font-bold flex justify-between items-center sm:text-sm md:text-base w-full">
                    <span className="text-gray-700">
                      {usePriceFormat(post.price)}
                    </span>
                    <span className="text-green-400">
                      {post.installments ? 'Kibanjampola' : 'Full price'}
                    </span>
                  </h1>
                </div>
                <Link href={`/land/${post.id}`} passHref>
                  <a>
                    <button className="w-full bg-orange-400 text-orange-50 flex justify-center items-center uppercase font-semibold grow py-2 md:py-4 hover:bg-orange-200 hover:text-orange-400 duration-150 ease-in-out">
                      buy this land
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </Zoom>
        ))}
      </CardsGrid>
    </section>
  );
};

export default UserScreen;
