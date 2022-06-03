// import { createClient } from '@supabase/supabase-js';
// import { useStore } from '../store/store';
// import Card from '../components/Card';
// import CardsGrid from '../components/CardsGrid';

import localData from '../store/data';
import ComponentWrapper from '../components/ComponentWrapper';
// import Button from '../components/Button';
import Hero from '../components/Hero';
import { useStore } from '../hooks/useStore';
import Card from '../components/Card';
import CardsGrid from '../components/CardsGrid';
import { HiOutlineRefresh } from 'react-icons/hi';

export default function Home({ fetchedData }) {
  let useData = localData; // fetchedData;

  // const { state, setState } = useStore();
  const { state, setState } = useStore();

  const { count } = state;

  const handleClick = () => {
    setState({
      type: 'ADD_COUNT',
      payload: {
        newCount: 5,
      },
    });
  };

  return (
    <section className="flex-col gap-8">
      {/* The Hero Section */}
      <Hero />
      {/* Main view content */}
      <ComponentWrapper wrap={true}>
        <CardsGrid>
          {useData.map((User) => {
            let user = {
              username: User.username,
              avatar: User.avatar,
            };

            return User.posts.map((post) => (
              <Card
                key={post.id}
                user={user}
                size={post.size}
                location={post.location}
                price={post.price}
                image={post.photos[0]}
              />
            ));
          })}
        </CardsGrid>
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
      </ComponentWrapper>
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
