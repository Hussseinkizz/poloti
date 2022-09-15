import UserScreen from '../../../screens/UserScreen';
import Loader from '../../../components/Loader';
import { supabase } from '../../../supabase-client';
import { useState, useEffect } from 'react';

export default function DynamicPage({ dataExport }) {
  const [userPosts, setUserPosts] = useState();
  // console.log('log', dataExport);

  useEffect(() => {
    if (dataExport) {
      setUserPosts(dataExport);
    }
  }, [dataExport]);

  return userPosts ? (
    <UserScreen userposts={userPosts} />
  ) : (
    <Loader type="user" />
  );
}

export const getServerSideProps = async ({ params }) => {
  // Query the targeted user's posts, with the post owner's profile
  // console.log('params', params);
  const { data: userPosts, error } = await supabase
    .from('posts')
    .select('*, profiles(*)')
    .eq('user_id', params.id)
    .order('created_at');

  if (error) {
    console.log(error);
    // Return 404 response.
    // No land posts found or something went wrong with the query
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dataExport: userPosts || null,
    },
  };
};
