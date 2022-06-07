import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import localData from '../../store/data';
import Image from 'next/image';

export default function LandScreen() {
  const [land, setLand] = useState(null);
  let useData = localData; // fetchedData;

  const router = useRouter();
  const { landId } = router.query;
  // const targetLand = useData.map((User) =>
  //   User.posts.find((targetLand) => targetLand.id === landId)
  // );

  useEffect(() => {
    if (!router.isReady) {
      <h1>
        Poloti <span className="text-green-400">{landId}</span> is loading...
      </h1>;
    }
    if (router.isReady) {
      useData.map((User) =>
        User.posts.map((post) => {
          if (post.id === landId) {
            setLand(post);
          }
        })
      );
    }
  }, [router.query.landId, router.isReady]);

  console.log(land);

  // const { id, size, location, price, photos, info, installments } = land;
  // let title = `${location} - ${size?.width} ku ${size?.height}`;

  // const TargetUser =

  if (!land) {
    return (
      <h1>
        Poloti <span className="text-red-400">{landId}</span> was not found!
      </h1>
    );
  }

  return <h1>clicked land's id is {land?.location}</h1>;
}
// use query params
// check if we have any land with the id parsed in the params
// if true go on, else return not found!
// if land with parsed id exists, then get it's info
// and then also get it's user / poster
