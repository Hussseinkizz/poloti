import { useState, useEffect } from 'react';

const CheckboxGroup = ({ checkStatus, handleCheckStatus }) => {
  const [isChecked, setIsChecked] = useState(true);

  // forward state
  handleCheckStatus(isChecked);

  // update check status on load
  useEffect(() => {
    setIsChecked(checkStatus);
  }, [checkStatus]);

  return (
    <div className="flex justify-center items-center gap-2">
      <div className="flex justify-center items-center gap-2">
        <input
          type="checkbox"
          name="land-sale-status-true"
          id="land-sale-status-true"
          checked={isChecked}
          onChange={() => setIsChecked(true)}
          className="outline-none border-gray-300 text-gray-600 rounded-md  hover:border-gray-100 focus:border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 appearance-none border  bg-white checked:text-gray-800 checked:border-gray-700 transition cursor-pointer h-6 w-6"
        />
        <span>Yes</span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <input
          type="checkbox"
          name="land-sale-status-false"
          id="land-sale-status-false"
          checked={!isChecked}
          onChange={() => setIsChecked(false)}
          className="outline-none border-gray-300 text-gray-600 rounded-md  hover:border-gray-100 focus:border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 appearance-none border  bg-white checked:text-gray-500 checked:border-gray-400 transition cursor-pointer h-6 w-6"
        />
        <span>No</span>
      </div>
    </div>
  );
};

export default CheckboxGroup;
