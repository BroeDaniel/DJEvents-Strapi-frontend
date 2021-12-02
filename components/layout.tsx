import Head from 'next/head';
import { ReactNode } from 'react';
import styles from '@/styles/Layout.module.css';
import Footer from './Footer';
import Header from './Header';
import Showcase from './Showcase';
import { useRouter } from 'next/router';

type layoutProps = {
  title: string;
  keywords: string;
  description: string;
  children: ReactNode;
};

export default function Layout({
  title,
  keywords,
  description,
  children,
}: layoutProps) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'DJ events | Find the hottest parties',
  description: 'Find the lastest DJ and other musical events',
  keywords: 'Music, dj, edm, events, more',
};
