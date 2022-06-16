import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import localData from '../../store/data';
import UserScreen from '../../components/UserScreen';
import Loader from '../../components/Loader';

export default function DynamicPage() {
  const [user, setUser] = useState(null);
  let useData = localData; // fetchedData;

  const router = useRouter();
  const { userId } = router.query;
  // console.log(router.query);

  useEffect(() => {
    if (!router.isReady) {
      <Loader type="warning" id={userId} />;
    }
    if (router.isReady) {
      useData.map((User) => {
        if (User.userId === userId) {
          setUser(User);
        }
      });
    }
  }, [router.query.userId, router.isReady, userId, useData]);

  // console.log(user);

  if (!user) {
    return <Loader type="user" id={userId} />;
  }
  if (user) {
    return <UserScreen user={user} />;
  }
}
