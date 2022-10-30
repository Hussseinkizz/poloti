import { Zoom } from 'react-reveal';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useNumberFormat } from '../hooks/useNumberFormat';
import { useMakeSlug } from '../hooks/useMakeSlug';
import { getPublicUrl } from '../supabase-client';
import { BsPatchCheckFill, BsPatchCheck } from 'react-icons/bs';

// import placeholder
import placeholder from '../public/images/placeholder.jpeg';

const Card = ({ post }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [userNameSlug, setUserNameSlug] = useState('');

  const {
    id,
    user_id,
    width,
    height,
    location,
    price,
    image1_url,
    installments,
  } = post;

  const { user_name, avatar_url } = post.profiles;

  let title1 = `${location}`;
  let title2 = `- ${width} ku ${height}`;

  useEffect(() => {
    if (post) {
      MakeSlug();
    }
  });

  const MakeSlug = () => {
    const { slug: userNameSlug } = useMakeSlug(user_name);
    setUserNameSlug(userNameSlug);
  };

  return (
    <Zoom>
      <div className="flex flex-col shadow-lg bg-gray-50 rounded-md overflow-hidden justify-between items-stretch grow">
        {/* Card Media */}
        <Link href={`/land/${id}`} passHref>
          <a>
            <div className="w-full h-60 group relative cursor-pointer flex grow">
              <Image
                src={image1_url ? getPublicUrl(image1_url) : placeholder}
                layout="fill"
                loading="lazy"
                objectFit="fill"
                alt={`Image of ${location}`}
                className={`w-full rounded-t-md hover:opacity-60 hover:scale-105 group-hover:scale-110 group-hover:opacity-75 transition duration-150 ease-linear ${
                  imageIsLoading
                    ? 'grayscale blur-3xl'
                    : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
                }`}
                onLoadingComplete={() => setImageIsLoading(false)}
              />
              {/* The overlay content */}
              <div
                className={`truncate capitalize absolute z-10 font-bold flex justify-center items-center w-full h-full text-white text-lg md:text-xl hover:text-orange-300 transition duration-150 ease-linear px-16 ${
                  imageIsLoading
                    ? 'bg-gradient-to-b from-orange-300 via-orange-200 to-orange-300 grayscale blur-3xl animate-pulse'
                    : 'grayscale-0 blur-0 transition-all animate-none duration-300 ease-in-out bg-transparent'
                }`}>
                {!imageIsLoading && (
                  <div className="rounded-md bg-black bg-opacity-25 px-4 py-2 flex justify-center items-center flex-auto flex-wrap gap-2">
                    <span>{title1}</span>
                    <span>{title2}</span>
                  </div>
                )}
              </div>
            </div>
          </a>
        </Link>
        {/* Card Content */}
        <div className="flex flex-col justify-between gap-4 grow">
          <div className="p-2 flex items-center justify-between gap-8">
            <Link
              // href={{
              //   pathname: '/user/[id]',
              //   query: { id: user_id },
              // }}
              // as={`/user/${userNameSlug}`}
              href={`/user/${user_id}`}
              passHref>
              <a className="flex justify-start gap-2 items-center cursor-pointer group">
                <span className="w-12 h-14 md:w-14 md:h-16 rounded-sm">
                  <Image
                    src={avatar_url ? getPublicUrl(avatar_url) : placeholder}
                    layout="responsive"
                    objectFit="fill"
                    width={35}
                    height={40}
                    alt={`${user_name} 's photo`}
                    className="w-full rounded-sm group-hover:opacity-85"
                  />
                </span>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-sm text-gray-600">Posted By:</span>
                  <span className="flex flex-auto flex-wrap text-gray-800 group-hover:text-gray-600 capitalize font-bold sm:text-sm md:text-base truncate group-hover:border-b hover:border-gray-600 transition">
                    {user_name}
                  </span>
                </div>
              </a>
            </Link>
            <h1 className="font-bold flex flex-col justify-between items-center sm:text-sm md:text-base">
              <span className="text-gray-800 text-xl md:text-xl  border px-2 rounded-md border-gray-300">
                {useNumberFormat(price)}
              </span>
              {!installments ? (
                <div className="flex gap-2 items-center justify-center text-green-500">
                  <BsPatchCheck />
                  <span>Full Price</span>
                </div>
              ) : (
                <div className="flex gap-2 items-center justify-center text-green-500">
                  <BsPatchCheckFill />
                  <span>Kibanjampola</span>
                </div>
              )}
            </h1>
          </div>
          <Link href={`/land/${id}`} passHref>
            <a>
              <button className="w-full bg-orange-400 text-orange-50 flex justify-center items-center uppercase font-semibold grow py-4 md:py-4 hover:bg-orange-200 hover:text-orange-400 duration-150 ease-in-out rounded-b-md">
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
