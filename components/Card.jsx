import { Zoom } from 'react-reveal';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useNumberFormat } from '../hooks/useNumberFormat';
import { useMakeSlug } from '../hooks/useMakeSlug';
import { getPublicUrl, getSignedUrl } from '../supabase-client';
import { BsPatchCheckFill, BsPatchCheck } from 'react-icons/bs';

// import placeholder
import placeholder from '../public/images/placeholder.jpeg';

const Card = ({ post }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [userNameSlug, setUserNameSlug] = useState('');
  const [signedUrl, setSignedUrl] = useState(null);

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

  const getUserAvatar = async (url) => {
    const res = await getSignedUrl('avatars', url);
    // console.log('res', avatar_url, res);
    setSignedUrl(res);
  };

  useEffect(() => {
    if (post) {
      MakeSlug();
    }
    if (avatar_url) {
      getUserAvatar(avatar_url);
    }
  });

  const MakeSlug = () => {
    const { slug: userNameSlug } = useMakeSlug(user_name);
    setUserNameSlug(userNameSlug);
  };

  return (
    <Zoom>
      <div className="flex overflow-hidden flex-col justify-between items-stretch bg-gray-50 rounded-md shadow-lg grow">
        {/* Card Media */}
        <Link href={`/land/${id}`} passHref>
          <a>
            <div className="flex relative w-full h-60 cursor-pointer group grow">
              <Image
                src={image1_url ? getPublicUrl(image1_url) : placeholder}
                layout="fill"
                loading="lazy"
                objectFit="fill"
                alt={`Image of ${location}`}
                className={`w-full rounded-t-md hover:opacity-60 hover:scale-105 group-hover:scale-110 group-hover:opacity-75 transition duration-150 ease-linear ${
                  imageIsLoading
                    ? 'blur-3xl grayscale'
                    : 'grayscale-0 transition-all duration-300 ease-in-out blur-0'
                }`}
                onLoadingComplete={() => setImageIsLoading(false)}
              />
              {/* The overlay content */}
              <div
                className={`truncate capitalize absolute z-10 font-bold flex justify-center items-center w-full h-full text-white text-lg md:text-xl hover:text-orange-300 transition duration-150 ease-linear px-16 ${
                  imageIsLoading
                    ? 'bg-gradient-to-b from-orange-300 via-orange-200 to-orange-300 blur-3xl grayscale animate-pulse'
                    : 'bg-transparent grayscale-0 transition-all duration-300 ease-in-out animate-none blur-0'
                }`}>
                {!imageIsLoading && (
                  <div className="flex flex-wrap flex-auto gap-2 justify-center items-center px-4 py-2 bg-black bg-opacity-25 rounded-md">
                    <span>{title1}</span>
                    <span>{title2}</span>
                  </div>
                )}
              </div>
            </div>
          </a>
        </Link>
        {/* Card Content */}
        <div className="flex flex-col gap-4 justify-between grow">
          <div className="flex gap-8 justify-between items-center p-2">
            <Link
              // href={{
              //   pathname: '/user/[id]',
              //   query: { id: user_id },
              // }}
              // as={`/user/${userNameSlug}`}
              href={`/user/${user_id}`}
              passHref>
              <a className="flex gap-2 justify-start items-center cursor-pointer group">
                <span className="w-12 h-14 rounded-sm md:w-14 md:h-16">
                  <Image
                  src={signedUrl ? signedUrl : placeholder}
                  layout="responsive"
                    objectFit="contain"
                    width={35}
                    height={40}
                    alt={`${user_name} 's photo`}
                    className="w-full rounded-sm group-hover:opacity-85"
                  />
                </span>
                <div className="flex flex-col justify-center items-start">
                  <span className="text-sm text-gray-600">Posted By:</span>
                  <span className="flex flex-wrap flex-auto font-bold text-gray-800 capitalize truncate transition group-hover:text-gray-600 sm:text-sm md:text-base group-hover:border-b hover:border-gray-600">
                    {user_name}
                  </span>
                </div>
              </a>
            </Link>
            <h1 className="flex flex-col justify-between items-center font-bold sm:text-sm md:text-base">
              <span className="px-2 text-xl text-gray-800 rounded-md border border-gray-300 md:text-xl">
                {useNumberFormat(price)}
              </span>
              {!installments ? (
                <div className="flex gap-2 justify-center items-center text-green-500">
                  <BsPatchCheck />
                  <span>Full Price</span>
                </div>
              ) : (
                <div className="flex gap-2 justify-center items-center text-green-500">
                  <BsPatchCheckFill />
                  <span>Kibanjampola</span>
                </div>
              )}
            </h1>
          </div>
          <Link href={`/land/${id}`} passHref>
            <a>
              <button className="flex justify-center items-center py-4 w-full font-semibold text-orange-50 uppercase bg-orange-400 rounded-b-md duration-150 ease-in-out grow md:py-4 hover:bg-orange-200 hover:text-orange-400">
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
