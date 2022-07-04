import Head from 'next/head';

//todo: use next-seo package for this!

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link
        rel="shortcut icon"
        href="/public/favicon.ico"
        type="image/x-icon"
      />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Next Amazona',
  keywords: 'Online Shop, amazon, next js, serato css',
  description: 'Online Shop for all your needs',
};

export default Meta;
