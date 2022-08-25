import { Zoom } from 'react-reveal';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CardsGrid from '../components/CardsGrid';

// import sample images
import sampleAvatar from '../public/images/me.png';
import sampleImage from '../public/images/img4.jpg';

const UserScreen = ({ userposts }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  const userPostCount = userposts.length;
  const userSoldPostCount = userposts.filter(
    (post) => post.is_sold !== false
  ).length;
  const { user_name } = userposts[0];

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

  return (
    <section className="mx-auto pb-10">
      {/* User Profile */}
      <div className="bg-svg-pattern flex flex-col justify-center gap-2 items-center sm:pt-4 border-b bg-gray-50 pb-2 mb-4 rounded-b-md pt-16 sm:pt-18">
        <span className="w-24 sm:32 h-24 sm:32">
          <Image
            src={sampleAvatar}
            layout="responsive"
            objectFit="contain"
            alt={`${user_name} 's photo`}
            className="rounded-full"
          />
        </span>
        <div className="flex justify-center items-center text-gray-800 capitalize font-bold text-xl sm:text-2xl md:text-3xl gap-2">
          {user_name}
        </div>
        <h1 className="font-semibold flex justify-center items-center gap-2">
          <span>Posted:</span>
          <span>
            {userPostCount > 1 ? `${userPostCount} plots,` : '1 plot,'}
          </span>
          <span className="text-gray-600">
            {userSoldPostCount === 0 ? `0 sold!` : `${userSoldPostCount} sold!`}
          </span>
        </h1>
      </div>
      {/* user posts */}
      <section className="mx-auto lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <CardsGrid></CardsGrid> */}
        <section className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 px-8 sm:px-0 relative z-0">
          {userposts.map((post, index) => {
            if (post.is_sold !== true) {
              return (
                <Zoom key={index}>
                  <div
                    key={post.id}
                    className="w-full flex flex-col shadow-lg bg-gray-50 rounded-t-md overflow-hidden justify-between items-stretch grow"
                  >
                    {/* Card Media */}
                    <Link href={`/land/${post.id}`} passHref>
                      <a>
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
                            <span>{`${post.location} - ${post.width} ku ${post.height}`}</span>
                          </div>
                        </div>
                      </a>
                    </Link>
                    {/* Card Content */}
                    <div className="flex flex-col justify-between gap-4 grow">
                      <div className="p-2 flex items-center justify-between gap-8">
                        <h1 className="font-bold flex justify-between items-center sm:text-sm md:text-base w-full">
                          <span className="text-gray-700">
                            {priceFormat(post.price)}
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
              );
            }
          })}
        </section>
      </section>
    </section>
  );
};

export default UserScreen;
