// import { useState, useEffect, useRef } from 'react';
// import { supabase } from '../supabase-client';

// const UserPostsAreaDummy = ({ userId, handlePostCount, dataExport }) => {
//   const [userPosts, setUserPosts] = useState(null);

//   useEffect(() => {
//     if (dataExport) {
//       console.log('data', dataExport);
//       setUserPosts(dataExport);
//       const data = getUserPosts(userId);
//       console.log('posts log', data);
//     }
//     if (userPosts) {
//       postCountValue = userPosts?.length;
//       handlePostCount(postCountValue);
//     }
//   }, []);

//   const getUserPosts = async ({ userId }) => {
//     const { data: userPosts, error } = await supabase
//       .from('posts')
//       .select('*, profiles(*)')
//       .eq('id', userId)
//       .order('created_at');

//     if (userPosts) {
//       return { userPosts };
//     }

//     if (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <section>
//       <h1>Hello posts!</h1>
//     </section>
//   );
// };

// export default UserPostsAreaDummy;
