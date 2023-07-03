import { useState } from 'react';
import {
  FcHome,
  FcAbout,
  FcAdvertising,
  FcSettings,
  FcTodoList,
  FcComboChart,
  FcTemplate,
  FcMultipleDevices,
  FcShop,
  FcFolder,
} from 'react-icons/fc';
import {
  HiOutlineArrowCircleRight,
  HiOutlineArrowCircleLeft,
} from 'react-icons/hi';
import Logo from '../public/images/Logo.svg';
import Image from 'next/image';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  let sidebarData = [
    {
      text: 'Home',
      icon: <FcHome />,
    },
    {
      text: 'Analytics',
      icon: <FcComboChart />,
    },
    {
      text: 'Marketing',
      icon: <FcAdvertising />,
    },
    {
      text: 'Files',
      icon: <FcFolder />,
    },
    {
      text: 'Tasks',
      icon: <FcTodoList />,
    },
    {
      text: 'E Shop',
      icon: <FcShop />,
    },
    {
      text: 'Utilities',
      icon: <FcTemplate />,
    },
    {
      text: 'About',
      icon: <FcAbout />,
    },
    {
      text: 'Devices',
      icon: <FcMultipleDevices />,
    },
    {
      text: 'Setting',
      icon: <FcSettings />,
    },
  ];

  return (
    <div
      className={`h-screen relative p-4 duration-500 bg-gray-100 border-r-2 border-gray-300 cursor-pointer ${
        isOpen ? 'w-48' : 'w-20'
      }`}
    >
      {/* Sidebar Toggle */}
      <span className="absolute text-xl text-white bg-gray-300 rounded-full cursor-pointer -right-3 top-1/2 hover:bg-gray-200">
        {isOpen ? (
          <HiOutlineArrowCircleLeft onClick={() => setIsOpen(false)} />
        ) : (
          <HiOutlineArrowCircleRight onClick={() => setIsOpen(true)} />
        )}
      </span>
      {/* Sidebar Brand */}
      <div className="flex items-center gap-x-2">
        <span className="cursor-pointer">
          <Image
            src={Logo}
            alt="Selli Logo"
            layout="fixed"
            height={50}
            width={50}
            objectFit="fill"
            className="aspect-1"
          />
        </span>
        <span
          className={`origin-left opacity-100 transition-transform duration-1000  font-medium text capitalize ${
            !isOpen && 'scale-0 opacity-0'
          }`}
        >
          Selli Suite
        </span>
      </div>
      {/* Sidebar Menu */}
      <ul className="flex flex-col justify-between h-4 gap-4 px-2 mt-8">
        {/* Group 1 */}
        <div className="flex flex-col gap-2">
          {
            // for (i=0;i<4;i++) {
            
            // }
          }
        </div>
        <div className="w-full h-4 bg-gray-800 rounded-md" />
        {/* Group 2 */}
        <div className="flex flex-col"></div>

        {/* Group 3 */}
        <div className="flex flex-col">
          <SidebarItem isOpen={isOpen} text="Setting" icon={<FcSettings />} />
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
