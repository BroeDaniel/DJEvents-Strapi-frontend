import EventItem from '@/components/EventItem';
import Layout from '@/components/layout';
import { API_URL } from '../config/index';
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
  image: string;
};

type pageProps = {
  events: JSONValue[];
};

export default function HomePage({ events }: pageProps) {
  return (
    <Layout>
      <h1>Upcoming events</h1>
      {events.length === 0 && <h3>No events at the moment</h3>}

      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View all events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
