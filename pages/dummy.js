import * as FaIcons from 'react-icons/fa';
import Link from 'next/link';

const Contact = () => {
  return (
    <section
      className="p-2 grid
      place-items-center"
    >
      {/* Contact Form */}
      <form
        className="grid 
      w-full
      space-y-8 
      place-items-center"
      >
        {/* Contact Text */}
        <p
          className=" 
        w-full 
        text-3xl font-bold
        text-gray-800 md:text-4xl 
        lg:text-5xl
        text-center md:my-4 lg:my-8"
        >
          <span className="px-2 md:block">
            Get in touch, we reply within
            <span className="text-orange-500 px-2">24 hours.</span>
          </span>
        </p>

        <section className="flex justify-center place-items-center w-full md:px-4 h-full">
          {/* Form Inputs */}
          <div className="flex flex-col space-y-3 md:justify-between md:h-full place-items-center px-4 md:px-0 md:w-3/5 w-full">
            <input
              type="text"
              placeholder="Your full name..."
              className="input"
            />
            <input
              type="text"
              placeholder="Your email address..."
              className="input"
            />
            <textarea
              cols="30"
              rows="5"
              placeholder="Your feedback..."
              className="input"
            />
            {/* Form Buttons */}
            <div className="flex space-x-4 justify-between place-items w-full">
              <button
                className="px-8 text-white 
          bg-gray-900 border 
          border-gray-100 
          focus:text-gray-500 btn-plain 
          hover:bg-gray-800 
          focus:bg-gray-700 
          hover:text-gray-400 
          hover:border-gray-300 w-full md:py-2"
              >
                Send
              </button>
            </div>
            <div className="w-full h-16 md:h-10" />
            {/* Form Options */}
            <div
              className="flex flex-row text-gray-900
          text-sm place-items-center w-full 
          justify-between md:text-base lg:text-lg"
            >
              <h2 className="space-x-2 flex w-full place-items-center">
                <span>
                  <FaIcons.FaPhoneSquareAlt />
                </span>
                <span className="font-semi-bold">+256 786234982</span>
              </h2>
              <div className="flex w-full space-x-4 place-items-center justify-end">
                <Link href="#" passHref>
                  <FaIcons.FaWhatsapp className="icon" />
                </Link>
                <Link href="#" passHref>
                  <FaIcons.FaFacebook className="icon" />
                </Link>
                <Link href="#" passHref>
                  <FaIcons.FaInstagram className="icon" />
                </Link>
                <Link href="#" passHref>
                  <FaIcons.FaTwitter className="icon" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </form>
    </section>
  );
};

export default Contact;
