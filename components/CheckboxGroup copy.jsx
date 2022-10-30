// import { useState, useCallback, useEffect } from 'react';
// import { supabase } from '../supabase-client';

// const CheckboxGroup = ({ targetID, checkStatus }) => {
//   const [isChecked, setIsChecked] = useState(true);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // toggle sales status
//   const handleCheck = (value) =>
//     useCallback(() => {
//       !isProcessing && console.log(`${targetID} checked`, value);
//       !isProcessing && setIsChecked(value);
//       !isProcessing && updateBackendStatus();
//     }, [value]);

//   // reflect change in backend...
//   const updateBackendStatus = async () => {
//     setIsProcessing(true);
//     try {
//       await supabase
//         .from('posts')
//         .update({
//           is_sold: isChecked,
//         })
//         .match({
//           id: targetID,
//         });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // update check status on load
//   useEffect(() => {
//     setIsChecked(checkStatus);
//   }, [checkStatus]);

//   return (
//     <div className="flex justify-center items-center gap-2">
//       <div className="flex justify-center items-center gap-2">
//         <input
//           type="checkbox"
//           name="land-sale-status-true"
//           id="land-sale-status-true"
//           checked={isChecked}
//           // onChange={() => setIsChecked(true)}
//           onChange={() => handleCheck(true)}
//           className="outline-none border-gray-300 text-gray-600 rounded-md  hover:border-gray-100 focus:border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 appearance-none border  bg-white checked:text-gray-800 checked:border-gray-700 transition cursor-pointer h-6 w-6"
//         />
//         <span>Yes</span>
//       </div>
//       <div className="flex justify-center items-center gap-2">
//         <input
//           type="checkbox"
//           name="land-sale-status-false"
//           id="land-sale-status-false"
//           checked={!isChecked}
//           // onChange={() => setIsChecked(false)}
//           onChange={() => handleCheck(false)}
//           className="outline-none border-gray-300 text-gray-600 rounded-md  hover:border-gray-100 focus:border-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 appearance-none border  bg-white checked:text-gray-500 checked:border-gray-400 transition cursor-pointer h-6 w-6"
//         />
//         <span>No</span>
//       </div>
//     </div>
//   );
// };

// export default CheckboxGroup;
