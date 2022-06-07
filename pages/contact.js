import ComponentWrapper from '../components/ComponentWrapper';
import Link from 'next/link';

const contact = () => {
  return (
    <ComponentWrapper wrap={true}>
      {/* Contact Form */}
      <form className="flex flex-col justify-center items-center w-full gap-2">
        {/* Contact Title */}
        <h1 className="w-full text-xl font-bold text-gray-800 md:text-2xl lg:text-3xl text-center md:my-4 lg:my-8">
          <span className="px-2 md:block">
            Get in touch, we reply within
            <span className="text-orange-500 px-2">24 hours.</span>
          </span>
        </h1>
        <div className="flex gap-2 flex-col">
          <input
            type="text"
            placeholder="Your full name..."
            className="flex justify-center items-center grow w-full rounded-md"
          />
          <input
            type="text"
            placeholder="Your email address..."
            className="flex justify-center items-center grow w-full rounded-md"
          />
        </div>
        <div className="flex">
          <textarea
            cols="30"
            rows="5"
            placeholder="Your feedback..."
            className="flex justify-center items-center grow w-full rounded-md"
          />
        </div>
        <Link href="#" passHref>
          <a>
            <button className="w-full bg-orange-400 text-orange-50 flex justify-center items-center uppercase font-semibold grow px-4 py-2 md:py-4 hover:bg-orange-200 hover:text-orange-400 duration-150 ease-in-out">
              send
            </button>
          </a>
        </Link>
      </form>
    </ComponentWrapper>
  );
};

export default contact;
