// user can view their posts, edit and delete them
// users can also post new land posts
// this is a protected route, only authenticated users can view it
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loader from '../../../components/Loader';
// import { supabase } from '../../../supabase-client';
import UserDashboard from '../../../screens/Dashboard';

// ? import sample data
import data from '../../../utils/data.json';

export default function DynamicPage({ posts }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  // console.log(router.query);

  useEffect(() => {
    if (!router.isReady) {
      <Loader type="warning" id={id} />;
    }
    if (router.isReady) {
      setIsLoading(false);
    }
  }, [router.isReady, id]);

  if (isLoading) {
    return <Loader type="dashboard-loader" id={id} />;
  }
  if (!isLoading) {
    // User Posts
    const userPosts = [];
    // set userPosts
    data.map((post) => {
      if (post.user_id === id) {
        userPosts.push(post);
      }
    });
    return <UserDashboard userposts={userPosts} />;
  }
}

// export const getServerSideProps = async () => {
//   // Query all land posts
//   const { data: posts, error } = await supabase
//     .from('posts')
//     .select('*')
//     .order('created_at');

//   if (error) {
//     console.log(error);
//     // Return 404 response.
//     // No land posts found or something went wrong with the query
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       posts,
//     },
//   };
// };
