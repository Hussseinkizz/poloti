import { useState } from 'react';

const SidebarItem = ({ isOpen, icon, text }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <li
      className={`flex items-center justify-start gap-4 p-2 transition rounded-md hover:text-white hover:bg-indigo-200 ${
        isActive && 'text-white bg-indigo-200'
      }`}
      onClick={() => setIsActive(true)}
    >
      <span>{icon}</span>
      <span
        className={`origin-left opacity-100 transition-transform duration-1000 delay-75 capitalize scale-100 flex ${
          !isOpen && 'scale-0 opacity-0'
        }`}
      >
        {text}
      </span>
    </li>
  );
};

export default SidebarItem;
