import '../styles/globals.css';
import Layout from '../components/Layout';
import { StoreProvider } from '../hooks/useStore';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
