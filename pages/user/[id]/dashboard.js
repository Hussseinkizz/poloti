// Todo: Make this a protected route!
import Loader from '../../../components/Loader';
import { supabase } from '../../../supabase-client';
import { useState, useEffect } from 'react';
import UserDashboard from '../../../screens/Dashboard';

export default function DynamicPage({ dataExport }) {
  const [userProfile, setUserProfile] = useState(null);
  // console.log('log', dataExport);

  useEffect(() => {
    if (dataExport) {
      setUserProfile(dataExport);
    }
  }, [dataExport]);

  return userProfile ? (
    <UserDashboard userProfile={userProfile} />
  ) : (
    <Loader type="dashboard-loader" />
  );
}

export const getServerSideProps = async ({ params }) => {
  // Query the targeted user, and render their profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    console.log(error);
    // Return 404 response.
    // No profiles found or something went wrong with the query
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dataExport: profile || null,
    },
  };
};
