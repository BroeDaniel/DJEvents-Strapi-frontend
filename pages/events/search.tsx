import EventItem from '@/components/EventItem';
import Layout from '@/components/layout';
import { API_URL } from '../../config/index';
import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSidePropsResult } from 'next';

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

type Params = {
  query: {
    term: string;
  };
};

export default function SearchPage({ events }: pageProps) {
  const router = useRouter();
  return (
    <Layout title='Search results'>
      <Link href='/events'>Back</Link>
      <h1>Search results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events at the moment</h3>}

      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({
  query: { term },
}: Params): Promise<GetServerSidePropsResult<pageProps>> {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
