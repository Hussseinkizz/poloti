import '../styles/globals.css';
import Layout from '../components/Layout';
import { StoreProvider } from '../hooks/useStore';
import { UserContextProvider } from '../utils/user-context';
import dynamic from 'next/dynamic';
import Meta from '../components/Meta';
// import PwaUpdater from '../PwaUpdater';


function MyApp({ Component, pageProps }) {
  // const PwaUpdater = dynamic(() => import(`../PwaUpdater`), { ssr: false });

  return (
    // Backend Data Layer
    <UserContextProvider>
      {/* Client Data Layer */}
      <Meta/>
      {/* <PwaUpdater /> */}
      <StoreProvider>
        {/* App Layout Provider */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </UserContextProvider>
  );
}

export default MyApp;
