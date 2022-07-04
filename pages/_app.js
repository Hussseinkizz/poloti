import '../styles/globals.css';
import Layout from '../components/Layout';
import { StoreProvider } from '../hooks/useStore';
import { UserContextProvider } from '../utils/user-context';

function MyApp({ Component, pageProps }) {
  return (
    // Backend Data Layer
    <UserContextProvider>
      {/* Client Data Layer */}
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
