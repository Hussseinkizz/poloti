// Todo: Make this a protected route!
import Loader from '../../../components/Loader';
import { supabase } from '../../../supabase-client';
import { useState, useEffect } from 'react';
import UserDashboard from '../../../screens/Dashboard';

export default function DynamicPage({ dataExport }) {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  // console.log('log', dataExport);


  const getUserPosts = async (userId) => {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at');

    if (posts) {
      setUserPosts(posts)
    } else {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (dataExport) {
      setUserProfile(dataExport);
    }
    if (userProfile) {
      getUserPosts(userProfile.id)
    }
  }, [dataExport,userProfile]);
  // console.log('userData',[userProfile, userPosts]);

  return userProfile ? (
    <UserDashboard userProfile={userProfile} userPosts={userPosts ?? []} />
  ) : (
    <Loader type="dashboard-loader" />
  );
}

export const getServerSideProps = async ({ params }) => {
  // Query the targeted user, and render their profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    console.log(error);
    // Return 404 response.
    // No profiles found or something went wrong with the query
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dataExport: profile || null,
    },
  };
};

// export const getServerSideProps = async ({ params }) => {
//   // Query the targeted user's posts, with the post owner's profile
//   // console.log('params', params);
//   const { data, error } = await supabase
//     .from('posts')
//     .select('*, profiles(*)')
//     .eq('user_id', params.id)
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
//       dataExport: data || null,
//     },
//   };
// };
