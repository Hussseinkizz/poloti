//resource: https://swiperjs.com/react
import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation } from 'swiper';

// import other stuff
import Image from 'next/image';

export default function LandScreenSlider({ photos, name }) {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  return (
    <section className="bg-gray-100 w-full h-80 _handle-swiper-height shadow-sm">
      <Swiper
        loop={true}
        speed={800}
        centeredSlides={true}
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        modules={[EffectFade, Navigation]}
        className="mySwiper"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-80 _handle-swiper-height relative bg-gray-900">
              <Image
                src={photo}
                layout="fill"
                loading="lazy"
                unoptimized={true}
                objectFit="fill"
                alt={`Image of ${name}`}
                className={`w-full ${
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
                <p className="_swiper-content-padding text-gray-300 text-xl sm:text-2xl md:text-4xl opacity-75 font-bold tracking-wide uppercase font-mono">
                  Poloti Images
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
