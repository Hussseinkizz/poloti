import LandScreenSlider from './LandScreenSlider';
import { HiArchive, HiArrowNarrowLeft, HiLocationMarker } from 'react-icons/hi';
import usePriceFormat from '../hooks/usePriceFormat';
import Image from 'next/image';
import Link from 'next/link';
import { makeSlug } from '../hooks/useMakeSlug';
// import MediaScroller from './MediaScroller';
import SimillarLands from './SimillarLands';

const LandScreen = ({ land, simillarLands, user }) => {
  const { size, location, price, photos, info, installments } = land;
  let title = `${location} - ${size?.width} ku ${size?.height}`;

  const { userId, username, avatar } = user;

  let { slug } = makeSlug(username);

  const userLink = `/users/${userId}/${slug}`;

  return (
    <section>
      <LandScreenSlider photos={photos} name={title} />
      <div className="mx-auto py-4 sm:py-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:justify-between sm:items-center font-bold border-b border-gray-400 pb-2">
          <h1 className="flex justify-start items-center font-bold text-xl">
            <span>
              <HiLocationMarker />
            </span>
            <span>{title}</span>
          </h1>
          <h2 className="font-semibold  text-lg flex sm:justify-evenly gap-2 items-center">
            <span className="text-green-500">
              Price: {usePriceFormat(price)} UGX
            </span>
            <span className="text-gray-400">
              - {installments ? 'Ku kibanjampola' : 'Full Price'}
            </span>
          </h2>
        </div>
        {/* User Profile */}
        <div className="flex justify-start gap-2 items-center py-2 sm:pt-4">
          <span className="w-8 h-8">
            <Image
              src={avatar}
              layout="responsive"
              objectFit="contain"
              alt={`${username} 's photo`}
              className="rounded-full"
            />
          </span>
          <div className="flex justify-center items-center text-gray-800 capitalize font-bold sm:text-sm md:text-base gap-2">
            <span>Posted by:</span>
            <Link href={`/users/${userId}`} passHref>
              <a className="text-orange-400 hover:border-b hover:border-orange-400 transition">
                {username}
              </a>
            </Link>
          </div>
        </div>
        {/* About land */}
        <h2 className="font-semibold mt-4 text-lg">About this land:</h2>
        <p>{info}</p>
        {/* The Actions */}
        <div className="flex gap-4 justify-start sm:justify-between items-center mt-4">
          <button className="flex space-x-2 text-orange-50 py-1 sm:py-2 md:py-4 px-2 rounded-md bg-orange-500 hover:bg-orange-400 hover:text-orange-100 active:scale-110 transition duration-150 ease-in-out uppercase sm:grow sm:shrink-0 text-center items-center justify-center">
            <Link href="tell:0754535493" passHref>
              <a>Call Us</a>
            </Link>
          </button>
          <button className="flex space-x-2 text-green-50 py-1 sm:py-2 md:py-4 px-2 rounded-md bg-green-500 hover:bg-green-400 hover:text-green-100 active:scale-110 transition duration-150 ease-in-out uppercase sm:grow sm:shrink-0 text-center items-center justify-center">
            <Link href="#" passHref>
              <a>Whatsapp</a>
            </Link>
          </button>
        </div>
      </div>
      {/* Simillar land by location */}
      {simillarLands.length !== 0 ? (
        <div className="mx-auto py-4 sm:py-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="flex justify-start items-center font-bold text-xl gap-2">
            <span>
              <HiArchive />
            </span>
            <span>Simillar lands</span>
          </h1>
          {/* <MediaScroller simillarLands={simillarLands} /> */}
          <SimillarLands simillarLands={simillarLands} />
        </div>
      ) : (
        <Link href="/" passHref>
          <div className="mx-auto py-4 sm:py-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
            <a className="flex justify-start items-center gap-2 hover:text-orange-400 transition cursor-pointer w-fit">
              <span>
                <HiArrowNarrowLeft />
              </span>
              <span>Go back home</span>
            </a>
          </div>
        </Link>
      )}
    </section>
  );
};

export default LandScreen;
