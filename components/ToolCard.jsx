import Photo from '../public/images/sample.png';
import MyPhoto from '../public/images/me.png';
import Image from 'next/image';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io5';

const ToolCard = () => {
  return (
    <div className="flex-col shadow-md bg-gray-50 border border-gray-200 rounded-md">
      {/* Card Header */}
      <div className="flex justify-between items-center p-4 mb-1">
        <div className="group relative cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8">
              <Image
                src={MyPhoto}
                layout="responsive"
                objectFit="contain"
                alt="User Image"
                className="rounded-full"
              />
            </span>
            <span className="capitalize text-gray-600 group-hover:underline">
              husseinkizz
            </span>
          </div>
          <div className="group-hover:flex group-hover:opacity-100 hidden z-10 absolute py-2 px-4 shadow-md bg-gray-50 border border-gray-200 rounded-md translate-x-12 -translate-y-2 items-center -top-full opacity-0 transition-opacity">
            <BsIcons.BsTwitter className="text-xl text-blue-500" />
            <a
              href="http://twitter.com/Husseinkizz"
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              @husseinkizz
            </a>
            <IoIcons.IoTriangle className="absolute w-6 h-6 text-gray-50 left-2 -bottom-3 rotate-180" />
          </div>
        </div>
        <span className="px-2 py-1 rounded-md border border-gray-200 uppercase font-mono font-semibold text-sm truncate">
          css framework
        </span>
      </div>
      {/* Card Body */}
      <a href="#" className="group">
        <div className="aspect-w-1 aspect-h-1 xl:aspect-h-8 w-full overflow-hidden">
          <div className="w-full">
            <Image
              src={Photo}
              layout="responsive"
              height={650}
              objectFit="cover"
              alt="Sample Image"
              title="tool name"
              className="group-hover:opacity-75"
            />
          </div>
          <div className="px-4">
            <div className="flex justify-between items-center">
              <h3 className="mt-4 text-lg text-gray-700 font-medium capitalize">
                Serato CSS
              </h3>
              <h3 className="text-sm lg:text-base flex justify-between items-center gap-2">
                <BsIcons.BsHeartFill className="text-orange-400" />
                <span>400+</span>
              </h3>
            </div>
            <p
              className="mt-1 text-sm
            text-gray-900 truncate"
            >
              Bad ass css framework for beginners, with colors and animations
              etc.
            </p>
          </div>
        </div>
      </a>
      {/* Card Footer */}
      <div className="flex p-4 justify-between items-center">
        <span>
          <BsIcons.BsHeart className="text-xl transition-all hover:text-red-400 outline-none active:text-2xl" />
        </span>
        <button className="px-2 py-1 bg-blue-500 rounded-sm text-blue-50 hover:bg-blue-400 transition-all border-2 active:border-blue-100 focus:border-blue-100 outline-none border-transparent hover:shadow-md">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Check it out
          </a>
        </button>
      </div>
    </div>
  );
};

export default ToolCard;
