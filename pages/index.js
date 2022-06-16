// import { createClient } from '@supabase/supabase-js';

import localData from '../store/data';
import ComponentWrapper from '../components/ComponentWrapper';
// import Button from '../components/Button';
import Hero from '../components/Hero';
import { useStore } from '../hooks/useStore';
import Card from '../components/Card';
import Filters from '../components/Filters';
import CardsGrid from '../components/CardsGrid';
import { HiOutlineRefresh } from 'react-icons/hi';

export default function Home({ fetchedData }) {
  let useData = localData; // fetchedData;

  // const { state, setState } = useStore();
  const { state, setState } = useStore();

  return (
    <section className="flex-col gap-8 relative">
      {/* The Hero Section */}
      <Hero />
      {/* Main view content */}
      <section className="mx-auto py-4 sm:py-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* The filters and sorting stuff */}
        <Filters />
        <section className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 py-2">
          {useData.map((User) => {
            let user = {
              username: User.username,
              avatar: User.avatar,
            };

            return User.posts.map((post) => (
              <Card
                key={post.id}
                landId={post.id}
                user={user}
                size={post.size}
                location={post.location}
                installments={post.installments}
                price={post.price}
                image={post.photos[0]}
              />
            ));
          })}
        </section>
        {/* <ComponentWrapper wrap={true}>
        <CardsGrid>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </CardsGrid> */}
        <div className="flex items-center justify-center mt-8">
          <HiOutlineRefresh className="animate-spin text-gray-400 text-xl" />
        </div>
        {/* <Button>Click me</Button> */}
      </section>
    </section>
  );
}

// fetch data from backend server...
// export async function getStaticProps() {
//   const supabaseAdmin = createClient(
//     process.env.SUPABASE_API_ENDPOINT,
//     process.env.SUPABASE_SERVICE_ROLE_KEY
//   );

//   const { data } = await supabaseAdmin.from('tools').select('*').order('id');

//   return {
//     props: {
//       fetchedData: data,
//     },
//   };
// }
