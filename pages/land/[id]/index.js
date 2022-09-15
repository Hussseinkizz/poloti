import LandScreen from '../../../screens/LandScreen';
import Loader from '../../../components/Loader';
import { supabase } from '../../../supabase-client';
import { useState, useEffect } from 'react';

export default function DynamicPage({ dataExport }) {
  const [post, setPost] = useState();
  // console.log('log', dataExport);

  useEffect(() => {
    if (dataExport) {
      setPost(dataExport);
    }
  }, [dataExport]);

  return post ? <LandScreen post={post} /> : <Loader type="land" />;
}

export const getServerSideProps = async ({ params }) => {
  // Query the targeted land post, with the post owner's profile
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, profiles(*)')
    .eq('id', params.id)
    .single();

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
      dataExport: post || null,
    },
  };
};
