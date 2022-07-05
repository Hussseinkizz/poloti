import { Zoom } from 'react-reveal';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import sampleImage from '../public/images/img4.jpg';

const SimillarLands = ({ simillarLands }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
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
    <section className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 py-2">
      {simillarLands.map((land, index) => {
        if (land.is_sold !== true) {
          return (
            <Zoom key={land.id}>
              <div
                key={index}
                className="flex flex-col shadow-lg bg-gray-50 rounded-t-md overflow-hidden justify-between items-stretch grow"
              >
                {/* Card Media */}
                <Link href={`/land/${land.id}`} passHref>
                  <a>
                    <div className="w-full h-60 group relative cursor-pointer flex grow">
                      <Image
                        src={sampleImage}
                        layout="fill"
                        loading="lazy"
                        objectFit="fill"
                        alt={`Image of ${land.location}`}
                        // title={title}
                        className={`w-full rounded-t-md hover:opacity-60 hover:scale-105 group-hover:scale-110 group-hover:opacity-75 transition duration-150 ease-linear ${
                          imageIsLoading
                            ? 'grayscale blur-3xl'
                            : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
                        }`}
                        onLoadingComplete={() => setImageIsLoading(false)}
                      />
                      {/* The overlay content */}
                      <div className="truncate absolute z-10 font-bold flex flex-col justify-center items-center w-full h-full text-white text-xl hover:text-orange-300 transition duration-150 ease-linear capitalize">
                        <span>{`${land.location} - ${land.width} ku ${land.height}`}</span>
                        <h1 className="font-bold flex flex-col justify-between items-center sm:text-sm md:text-base">
                          <span className="text-white">
                            {priceFormat(land.price)}
                          </span>
                          <span className="text-green-400 rounded-md bg-black bg-opacity-20 px-4 py-2">
                            {land.installments ? 'Kibanjampola' : 'Full price'}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </Zoom>
          );
        }
      })}
    </section>
  );
};

export default SimillarLands;
