import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LandScreen from '../../../screens/LandScreen';
import Loader from '../../../components/Loader';
import { supabase } from '../../../supabase-client';

// ?Import local data for sampling
import data from '../../../utils/data.json';

export default function DynamicPage({ posts }) {
  const [land, setLand] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      <Loader type="warning" id={id} />;
    }
    if (router.isReady) {
      data.map((post) => {
        if (post.id === id) {
          setLand(post);
        }
      });
    }
  }, [router.isReady, id, data]);

  // console.log(land, user);

  if (!land) {
    return <Loader type="land" id={id} />;
  }
  // Get simillar lands
  const simillars = [];

  if (land) {
    data.map((post) => {
      if (post.location === land.location && post.id !== land.id) {
        simillars.push(post);
      }
    });
  }

  return <LandScreen land={land} simillarLands={simillars} />;
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
