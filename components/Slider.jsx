//slider with navigation
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Fade from 'react-reveal/Fade';
import Image from 'next/image';

import Photo1 from '../public/images/img6.jpg';
import Photo2 from '../public/images/img3.jpeg';
import Photo3 from '../public/images/img4.jpg';
import Photo4 from '../public/images/img5.jpg';

const Slider = () => {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  let name = 'slider';
  return (
    <section className="bg-gray-100 w-full h-80 _handle-swiper-height shadow-sm">
      <Swiper
        modules={[Navigation, EffectFade]}
        navigation
        effect
        speed={800}
        slidesPerView={1}
        loop
        autoplay="true"
        className="_slider"
      >
        {/* Slider item 1 */}
        <SwiperSlide>
          <div className="w-full h-80 _handle-swiper-height relative bg-gray-900">
            <Image
              src={Photo1}
              layout="fill"
              loading="lazy"
              objectFit="fill"
              alt={`Image of ${name}`}
              className={`w-full  bg-blend-darken opacity-75 ${
                imageIsLoading
                  ? 'grayscale blur-3xl'
                  : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
              }`}
              onLoadingComplete={() => setImageIsLoading(false)}
            />
            {/* The overlay content */}
            <div
              className="absolute z-10 h-full w-full text-center flex flex-col gap-4 items-center justify-center mx-auto
              "
            >
              <p className="_swiper-content-padding text-gray-50 text-xl sm:text-2xl md:text-3xl">
                Easily buy your
                <span className="px-2 border-b border-orange-400">
                  verified
                </span>
                land or sell one with us, so easy!
              </p>
              <button className="flex space-x-2 place-items-center text-gray-50 py-1 px-2 rounded-md bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:text-gray-300 active:scale-95 transition duration-150 ease-in-out">
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide>
        {/* Slider item 2 */}
        <SwiperSlide>
          <div className="w-full h-80 _handle-swiper-height relative bg-gray-900">
            <Image
              src={Photo2}
              layout="fill"
              loading="lazy"
              objectFit="fill"
              alt={`Image of ${name}`}
              className={`w-full  bg-blend-darken opacity-75 ${
                imageIsLoading
                  ? 'grayscale blur-3xl'
                  : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
              }`}
              onLoadingComplete={() => setImageIsLoading(false)}
            />
            {/* The overlay content */}
            <div
              className="absolute z-10 h-full w-full text-center flex flex-col gap-4 items-center justify-center mx-auto
              "
            >
              <p className="_swiper-content-padding text-gray-50 text-xl sm:text-2xl md:text-3xl">
                Wherever you want your land to be located, we got you covered
                from over 102 districts in Uganda.
              </p>
              {/* <button className="flex space-x-2 place-items-center text-gray-50 py-1 px-2 rounded-md bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:text-gray-300 active:scale-95 transition duration-150 ease-in-out">
                Learn More
              </button> */}
            </div>
          </div>
        </SwiperSlide>
        {/* Slider item 3 */}
        <SwiperSlide>
          <div className="w-full h-80 _handle-swiper-height relative bg-gray-900">
            <Image
              src={Photo3}
              layout="fill"
              loading="lazy"
              objectFit="fill"
              alt={`Image of ${name}`}
              className={`w-full  bg-blend-darken opacity-75 ${
                imageIsLoading
                  ? 'grayscale blur-3xl'
                  : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
              }`}
              onLoadingComplete={() => setImageIsLoading(false)}
            />
            {/* The overlay content */}
            <div
              className="absolute z-10 h-full w-full text-center flex flex-col gap-4 items-center justify-center mx-auto
              "
            >
              <p className="_swiper-content-padding text-gray-50 text-xl sm:text-2xl md:text-3xl">
                When you want to sell that land for the better, we get you
                serious and paying buyers, quick and legit!
              </p>
              {/* <button className="flex space-x-2 place-items-center text-gray-50 py-1 px-2 rounded-md bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:text-gray-300 active:scale-95 transition duration-150 ease-in-out">
                Learn More
              </button> */}
            </div>
          </div>
        </SwiperSlide>
        {/* Slider item 4 */}
        <SwiperSlide>
          <div className="w-full h-80 _handle-swiper-height relative bg-gray-900">
            <Image
              src={Photo4}
              layout="fill"
              loading="lazy"
              objectFit="fill"
              alt={`Image of ${name}`}
              className={`w-full  bg-blend-darken opacity-75 ${
                imageIsLoading
                  ? 'grayscale blur-3xl'
                  : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
              }`}
              onLoadingComplete={() => setImageIsLoading(false)}
            />
            {/* The overlay content */}
            <div
              className="absolute z-10 h-full w-full text-center flex flex-col gap-4 items-center justify-center mx-auto
              "
            >
              <p className="_swiper-content-padding text-gray-50 text-xl sm:text-2xl md:text-3xl">
                You want in town or around Kampala? No problem! <br /> It's all
                on one platform, right here...
              </p>
              {/* <button className="flex space-x-2 place-items-center text-gray-50 py-1 px-2 rounded-md bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:text-gray-300 active:scale-95 transition duration-150 ease-in-out">
                Learn More
              </button> */}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

// todo: make this in js css work!
// - also make slider bg image effects, dark , and blending
// - consider paginated over arrow controls
// - loop over slide items data instead to render each item
// - Add slider overlay content
{
  /* <style>
  .swiper-button-next, .swiper-button-prev {`color: orange !important;`}
</style>; */
}

export default Slider;
