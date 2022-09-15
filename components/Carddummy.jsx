// import { Zoom } from 'react-reveal';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePriceFormat } from '../hooks/usePriceFormat';
// import { useMakeSlug } from '../hooks/useMakeSlug';
// import { supabase, getPublicUrl } from '../supabase-client';
// import { BsPatchCheckFill, BsPatchCheck } from 'react-icons/bs';

// // import placeholder image
// import placeholder from '../public/images/placeholder.jpeg';

// const Card = ({ post }) => {
//   const [imageIsLoading, setImageIsLoading] = useState(true);
//   const [signedUrl, setSignedUrl] = useState('');
//   const [postOwner, setPostOwner] = useState({});

//   const {
//     id,
//     user_id,
//     width,
//     height,
//     location,
//     price,
//     image1_url,
//     installments,
//   } = post;

//   const { user_name, avatar_url } = postOwner;

//   const title = `${location} - ${width} ku ${height}`;
//   const { slug: urlSlug } = useMakeSlug(title);
//   const { slug: userNameSlug } = useMakeSlug(user_name);

//   useEffect(() => {
//     if (image1_url) {
//       let newUrl = getPublicUrl(image1_url);
//       setSignedUrl(newUrl);
//     }
//     if (user_id) {
//       getPostOwner();
//     }
//   });

//   const getPostOwner = async () => {
//     const { data: user, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', user_id)
//       .single();

//     if (user) {
//       setPostOwner(user);
//     } else {
//       console.log(error.message);
//     }
//   };

//   return (
//     <Zoom>
//       <div className="flex flex-col shadow-lg bg-gray-50 rounded-md overflow-hidden justify-between items-stretch grow">
//         {/* Card Media */}
//         <Link href={`/land/${id}`} as={`/land/${urlSlug}`} prefetch passHref>
//           <a>
//             <div className="w-full h-60 group relative cursor-pointer flex grow">
//               <Image
//                 src={signedUrl ? signedUrl : placeholder}
//                 layout="fill"
//                 loading="lazy"
//                 objectFit="fill"
//                 alt={`Image of ${location}`}
//                 className={`w-full rounded-t-md hover:opacity-60 hover:scale-105 group-hover:scale-110 group-hover:opacity-75 transition duration-150 ease-linear ${
//                   imageIsLoading
//                     ? 'grayscale blur-3xl'
//                     : 'grayscale-0 blur-0 transition-all duration-300 ease-in-out'
//                 }`}
//                 onLoadingComplete={() => setImageIsLoading(false)}
//               />
//               {/* The overlay content */}
//               <div className="truncate capitalize absolute z-10 font-bold flex justify-center items-center w-full h-full text-white text-lg md:text-xl hover:text-orange-300 transition duration-150 ease-linear">
//                 {signedUrl && (
//                   <span className="rounded-md bg-black bg-opacity-20 px-4 py-2">
//                     {title}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </a>
//         </Link>
//         {/* Card Content */}
//         <div className="flex flex-col justify-between gap-4 grow">
//           <div className="p-2 flex items-center justify-between gap-8">
//             <Link
//               href={`/user/${user_id}`}
//               as={`/users/${userNameSlug}`}
//               passHref
//             >
//               <a className="flex justify-start gap-2 items-center cursor-pointer group">
//                 <span className="w-14 h-14">
//                   <Image
//                     src={avatar_url ? getPublicUrl(avatar_url) : placeholder}
//                     layout="responsive"
//                     objectFit="contain"
//                     width={30}
//                     height={30}
//                     alt={`${user_name} 's photo`}
//                     className="rounded-full group-hover:opacity-85"
//                   />
//                 </span>
//                 <div className="flex flex-col items-center justify-center">
//                   <span className="text-sm text-gray-600">Posted By:</span>
//                   <span className="text-gray-800 group-hover:text-gray-600 capitalize font-bold sm:text-sm md:text-base truncate group-hover:border-b hover:border-gray-600 transition">
//                     {user_name}
//                   </span>
//                 </div>
//               </a>
//             </Link>
//             <h1 className="font-bold flex flex-col justify-between items-center sm:text-sm md:text-base">
//               <span className="text-gray-800 text-xl md:text-xl  border px-2 rounded-md border-gray-300">
//                 {usePriceFormat(price)}
//               </span>
//               {!installments ? (
//                 <div className="flex gap-2 items-center justify-center text-green-500">
//                   <BsPatchCheck />
//                   <span>Full Price</span>
//                 </div>
//               ) : (
//                 <div className="flex gap-2 items-center justify-center text-green-500">
//                   <BsPatchCheckFill />
//                   <span>Kibanjampola</span>
//                 </div>
//               )}
//             </h1>
//           </div>
//           <Link href={`/land/${id}`} as={`/land/${urlSlug}`} passHref>
//             <a>
//               <button className="w-full bg-orange-400 text-orange-50 flex justify-center items-center uppercase font-semibold grow py-4 md:py-4 hover:bg-orange-200 hover:text-orange-400 duration-150 ease-in-out rounded-b-md">
//                 buy this land
//               </button>
//             </a>
//           </Link>
//         </div>
//       </div>
//     </Zoom>
//   );
// };

// export default Card;
