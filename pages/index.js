import Hero from '../components/Hero';
import { useStore } from '../hooks/useStore';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Filters from '../components/Filters';
import Loader from '../components/Loader';
import CustomSearchModal from '../components/CustomSearchModal';
import { HiOutlineRefresh } from 'react-icons/hi';
import { supabase } from '../supabase-client';

export default function Home({ dataExport }) {
  // console.log('posts', dataExport);
  // const { state, setState } = useStore();
  const { state, setState } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (dataExport) {
      setPosts(dataExport);
    }
  }, [dataExport]);

  if (!posts) {
    // some skeletons loading screen...
    return <Loader type="main-loader" />;
  }

  return (
    <section className="flex-col gap-8 relative">
      {/* The Hero Section */}
      <Hero />
      {/* Main view content */}
      <section className="mx-auto py-4 sm:py-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* The filters and sorting stuff */}
        <Filters openCustomSearchModal={() => setShowModal(true)} />
        <section className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 py-2">
          {posts.map((post) => {
            if (post.is_sold !== true) {
              return <Card key={post.id} post={post} />;
            }
          })}
        </section>
        <div className="flex items-center justify-center my-8">
          <HiOutlineRefresh className="animate-spin text-gray-400 text-xl" />
        </div>
      </section>
      <CustomSearchModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
      />
    </section>
  );
}

// 1. fetch all land posts with respective user profiles
// 2. sort them by creation time stamps using query
// 3. use that data on page!
export const getServerSideProps = async () => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, profiles(*)')
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
      dataExport: posts || null,
    },
  };
};
