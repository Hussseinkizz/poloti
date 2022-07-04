import LandScreenSlider from '../components/LandScreenSlider';
import {
  HiArchive,
  HiArrowNarrowLeft,
  HiLocationMarker,
  HiExclamationCircle,
} from 'react-icons/hi';
import usePriceFormat from '../hooks/usePriceFormat';
import Image from 'next/image';
import Link from 'next/link';
import { makeSlug } from '../hooks/useMakeSlug';
import { useWhatsappLink } from '../hooks/useWhatsappLink';
import SimillarLands from '../components/SimillarLands';

// ?import sample user avatar
import sampleAvatar from '../public/images/me.png';
import sampleImage from '../public/images/img4.jpg';

const LandScreen = ({ land, simillarLands }) => {
  const {
    id,
    width,
    height,
    location,
    price,
    photos,
    info,
    installments,
    is_sold,
  } = land;
  let title = `${location} - ${width} ku ${height}`;

  const { user_id, user_name, user_avatar } = land;

  let { slug } = makeSlug(user_name);

  // const userLink = `/user/${user_id}/${slug}`;
  const WhatsappMessage = `Hello Poloti Admin am interested in ${id},${title}`;
  let { whatsappLink } = useWhatsappLink(256754535493, WhatsappMessage);
  // console.log(whatsappLink);

  return (
    <section>
      <LandScreenSlider
        photos={[sampleImage, sampleImage, sampleImage]}
        name={title}
      />
      <div className="mx-auto py-4 sm:py-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:justify-between sm:items-center font-bold border-b border-gray-400 pb-2">
          <h1 className="flex justify-start items-center font-bold text-xl capitalize">
            <span>
              <HiLocationMarker />
            </span>
            <span>{title}</span>
          </h1>
          {!is_sold ? (
            <h2 className="font-semibold  text-lg flex sm:justify-evenly gap-2 items-center">
              <span className="text-green-500">
                Price: {usePriceFormat(price)} UGX
              </span>
              <span className="text-gray-400">
                - {installments ? 'Ku kibanjampola' : 'Full Price'}
              </span>
            </h2>
          ) : (
            <h1 className="font-semibold  text-lg text-center text-red-400  truncate flex sm:justify-evenly gap-2 items-center">
              <HiExclamationCircle className="text-xl md:text-2xl" />
              <span className="capitalize">plot already sold!</span>
            </h1>
          )}
        </div>
        {/* User Profile */}
        <div className="flex justify-start gap-2 items-center py-2 sm:pt-4">
          <span className="w-8 h-8">
            <Image
              src={sampleAvatar}
              layout="responsive"
              objectFit="contain"
              alt={`${user_name} 's photo`}
              className="rounded-full"
            />
          </span>
          <div className="flex justify-center items-center text-gray-800 capitalize font-bold sm:text-sm md:text-base gap-2">
            <span>Posted by:</span>
            <Link href={`/user/${user_id}`} passHref>
              <a className="text-orange-400 hover:border-b hover:border-orange-400 transition">
                {user_name}
              </a>
            </Link>
          </div>
        </div>
        {/* About land */}
        <h2 className="font-semibold mt-4 text-lg">About this land:</h2>
        <p>{info}</p>
        {/* The Actions */}
        {is_sold ? (
          <div className="flex gap-4 justify-start sm:justify-between items-center mt-4">
            <button className="flex space-x-2 text-gray-100 py-1 sm:py-2 md:py-4 px-2 rounded-md bg-gray-200 uppercase sm:grow sm:shrink-0 text-center items-center justify-center">
              Call Us
            </button>
            <button className="flex space-x-2 text-gray-100 py-1 sm:py-2 md:py-4 px-2 rounded-md bg-gray-200 uppercase sm:grow sm:shrink-0 text-center items-center justify-center">
              Whatsapp
            </button>
          </div>
        ) : (
          <div className="flex gap-4 justify-start sm:justify-between items-center mt-4">
            <Link href="tel:+256754535493" passHref>
              <a
                target="_blank"
                className="flex space-x-2 text-orange-50 py-1 sm:py-2 md:py-4 px-2 rounded-md bg-orange-500 hover:bg-orange-400 hover:text-orange-100 active:scale-110 transition duration-150 ease-in-out uppercase sm:grow sm:shrink-0 text-center items-center justify-center"
              >
                Call Us
              </a>
            </Link>
            <Link href={whatsappLink} passHref>
              <a
                target="_blank"
                className="flex space-x-2 text-green-50 py-1 sm:py-2 md:py-4 px-2 rounded-md bg-green-500 hover:bg-green-400 hover:text-green-100 active:scale-110 transition duration-150 ease-in-out uppercase sm:grow sm:shrink-0 text-center items-center justify-center"
              >
                Whatsapp
              </a>
            </Link>
          </div>
        )}{' '}
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
