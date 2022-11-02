import LandScreenSlider from '../components/LandScreenSlider';
import {
  HiArchive,
  HiArrowNarrowLeft,
  HiLocationMarker,
  HiExclamationCircle,
} from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import { useMakeSlug } from '../hooks/useMakeSlug';
import { useWhatsappLink } from '../hooks/useWhatsappLink';
import SimillarLands from '../components/SimillarLands';

// import placeholder image
import placeholder from '../public/images/placeholder.jpeg';

import { useNumberFormat } from '../hooks/useNumberFormat';
import { getPublicUrl, getSignedUrl } from '../supabase-client';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase-client';

const LandScreen = ({ post }) => {
  const [relatedPosts, setRelatedPosts] = useState(null);
  const [signedUrl, setSignedUrl] = useState(null);

  const {
    id,
    width,
    height,
    location,
    installments,
    is_sold,
    price,
    info,
    user_id,
    image1_url,
    image2_url,
    image3_url,
    image4_url,
  } = post;

  const { user_name, avatar_url } = post.profiles;

  const title = `${location} - ${width} ku ${height}`;
  const { slug: userNameSlug } = useMakeSlug(user_name);
  const image1 = getPublicUrl(image1_url);
  const image2 = getPublicUrl(image2_url);
  const image3 = getPublicUrl(image3_url);
  const image4 = getPublicUrl(image4_url);

  // const userLink = `/user/${user_id}/${slug}`;
  const WhatsappMessage = `Hello Poloti Admin am interested in #${id},${title}`;
  let { whatsappLink } = useWhatsappLink(256754535493, WhatsappMessage);
  // console.log(whatsappLink);

  const getUserAvatar = async (url) => {
    const res = await getSignedUrl('avatars', url);
    // console.log('res', avatar_url, res);
    setSignedUrl(res);
  };


  // * get related posts from supabase
  useEffect(() => {
    if (location) {
      getRelatedPosts();
    }
    if (avatar_url) {
      getUserAvatar(avatar_url);
    }
  }, [location, avatar_url]);

  const getRelatedPosts = async () => {
    const { data: samePosts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('location', location)
      .order('created_at');

    if (samePosts) {
      // remove the currently rendered post...
      const uniqueSamePosts = samePosts.filter(
        (somePost) => somePost.id != post.id
      );
      setRelatedPosts(uniqueSamePosts);
    } else {
      console.log(error);
    }
  };

  return (
    <section>
      <LandScreenSlider
        photos={[image1, image2, image3, image4]}
        name={title}
      />
      <div className="mx-auto py-4 sm:py-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:justify-between sm:items-center font-bold border-b border-gray-200 pb-2">
          <h1 className="flex justify-start items-center font-bold text-xl capitalize">
            <span>
              <HiLocationMarker />
            </span>
            <span>{title}</span>
          </h1>
          {!is_sold ? (
            <h2 className="font-semibold  text-lg flex sm:justify-evenly gap-2 items-center">
              <span className="text-green-500">
                Price: {useNumberFormat(price)} UGX
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
          <span className="w-16 h-16">
            <Image
              src={signedUrl ? signedUrl : placeholder}
              layout="responsive"
              objectFit="contain"
              width={50}
              height={50}
              alt={`${user_name} 's photo`}
              className="rounded-md"
            />
          </span>
          <div className="flex justify-center items-center text-gray-800 capitalize font-bold sm:text-sm md:text-base gap-2">
            <span>Posted by:</span>
            {/* comment start-- href={`/user/${user_id}?id=${user_id}`}
            as={`/user/${userNameSlug}`} --comment end */}
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
      {relatedPosts && relatedPosts.length !== 0 ? (
        <div className="mx-auto py-4 sm:py-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="flex justify-start items-center font-bold text-xl gap-2">
            <span>
              <HiArchive />
            </span>
            <span>Simillar lands</span>
          </h1>
          {/* <MediaScroller simillarLands={simillarLands} /> */}
          <SimillarLands simillarLands={relatedPosts} />
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
