import Layout from '@/components/layout';
import EventMap from '@/components/EventMap';
import Image from 'next/image';
import {
  GetServerSidePropsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next';
import { API_URL } from '../../config/index';
import styles from '@/styles/Event.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

type JSONValue = {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image: any;
};

type Params = {
  query: {
    slug: string;
  };
};
type Params2 = {
  params: {
    slug: string;
  };
};

type pageProps = {
  evt: JSONValue;
};

export default function EventPage({ evt }: pageProps) {
  const router = useRouter();

  // const deleteEvent = async (e: MouseEvent<HTMLAnchorElement>) => {
  //   if (confirm('Are you sure?')) {
  //     const res = await fetch(`${API_URL}/events/${evt.id}`, {
  //       method: 'DELETE',
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       toast.error(data.message);
  //     } else {
  //       router.push('/events');
  //     }
  //   }
  // };

  return (
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete event
          </a>
        </div> */}
        <span>
          {new Date(evt.date).toLocaleDateString('da-DK')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <EventMap evt={evt} />

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   const paths = events.map((e: { slug: string }) => ({
//     params: { slug: e.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({
//   params: { slug },
// }: Params2): Promise<GetStaticPropsResult<pageProps>> {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({
  query: { slug },
}: Params): Promise<GetServerSidePropsResult<pageProps>> {
  // const { slug } = query;
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
  };
}
