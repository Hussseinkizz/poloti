import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import localData from '../../store/data';
import LandScreen from '../../components/LandScreen';
import Loader from '../../components/Loader';

export default function DynamicPage() {
  const [land, setLand] = useState(null);
  const [user, setUser] = useState(null);
  let useData = localData; // fetchedData;

  const router = useRouter();
  const { landId } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      <Loader type="warning" id={landId} />;
    }
    if (router.isReady) {
      useData.map((User) =>
        User.posts.map((post) => {
          if (post.id === landId) {
            setLand(post);
            setUser(User);
          }
        })
      );
    }
  }, [router.query.landId, router.isReady, landId, useData]);

  // console.log(land, user);

  if (!land) {
    return <Loader type="land" id={landId} />;
  }
  // Get simillar lands
  const simillars = [];

  if (land) {
    useData.map((User) => {
      let lands = User.posts.map((anyLand) => anyLand);
      lands.map((eachLand) => {
        if (eachLand.location === land.location && eachLand.id !== land.id) {
          simillars.push(eachLand);
        }
      });
    });
  }

  return <LandScreen user={user} land={land} simillarLands={simillars} />;
}
// use query params
// check if we have any land with the id parsed in the params
// if true go on, else return not found!
// if land with parsed id exists, then get it's info
// and then also get it's user / poster
