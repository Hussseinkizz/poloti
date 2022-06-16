import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import localData from '../../store/data';
import UserScreen from '../../components/UserScreen';

export default function DynamicPage() {
  const [user, setUser] = useState(null);
  let useData = localData; // fetchedData;

  const router = useRouter();
  const { userId } = router.query;
  // console.log(router.query);

  useEffect(() => {
    if (!router.isReady) {
      <h1>
        Poloti <span className="text-orange-400">.com</span> is loading...
      </h1>;
    }
    if (router.isReady) {
      useData.map((User) => {
        if (User.userId === userId) {
          setUser(User);
        }
      });
    }
  }, [router.query.userId, router.isReady]);

  // console.log(user);

  if (!user) {
    return (
      <h1>
        User <span className="text-orange-400">{userId}</span> is loading...
      </h1>
    );
  }
  if (user) {
    return <UserScreen user={user} />;
  }
}
