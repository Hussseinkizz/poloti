// import { useEffect } from 'react';
// /**
//  * It takes a file, reads it as a data URL, and returns the data URL.
//  * @param file - The file to be read.
//  * @returns A promise.
//  */

// // * method 1
// export async function useImagePreview(file) {
//   let result = '';

//   const reader = new FileReader();
//   reader.addEventListener('load', (e) => {
//     result = e.target.result;
//   });
//   reader.readAsDataURL(file);
//   return { previewUrl: result };
// }

// // * method 2
// export async function useImagePreviewUrl(file) {
//   let result = '';

//   useEffect(() => {
//     const objectUrl = URL.createObjectURL(file);
//     result = objectUrl;
//     // console.log('url', result);

//     // free memory when ever this component is unmounted
//     return () => URL.revokeObjectURL(objectUrl);
//   }, [file]);
//   return { previewUrl: result };
// }

// // * this works...
// generate images to upload preview
// useEffect(() => {
//   if (images && images.length > 0) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const result = reader.result;
//       console.log(result);
//       setImagePreviewUrl(result);
//     };
//     reader.readAsDataURL(images[0]);
//   }
// }, [images]);

// useEffect(() => {
//   if (image4_url) {
//     // Signed URL
//     supabase.storage
//       .from('post_images') // bucket name
//       .createSignedUrl(
//         image4_url, // path to the image in the bucket
//         36000 // time that the URL is valid in seconds
//       )
//       .then((data) => {
//         if (data.error) {
//           // Todo: handle error
//           console.log(data.error);
//         }

//         setSignedUrl(data.signedURL);
//         console.log('image', image4_url, 'url', signedUrl);
//       });
//   }
// }, [post]);
