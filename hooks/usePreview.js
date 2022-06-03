export default function usePreview(link) {
  let preview = `https://image.thum.io/get/${link}`;
  // console.log(preview);
  return preview;
}

// {
//   /* <img src="//image.thum.io/get/http://www.google.com/" />; */
// }

// For use in Node.js or in browser with Webpack or Browserify
// var thum = require('thum.io');
// var thumURL = thum.getThumURL({
//   url: 'https://www.facebook.com',
//   width: 1200,
//   auth: {
//     type: 'md5',
//     secret: process.env.THUM_IO_SECRET,
//     keyId: 500,
//   },
// });

// My thum.io if needed!
// Id: 57472
// Nickname: dev-index.netlify.app
// Referer Domain: dev-index.netlify.app

// Easist way to use this api...
