import EventItem from '@/components/EventItem';
import Layout from '@/components/layout';
import Pagination from '@/components/Pagination';
import { API_URL } from '../../config/index';
const PER_PAGE = 5;

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
  page: number;
  total: number;
};

export default function EventsPage({ events, page, total }: pageProps) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events at the moment</h3>}

      {events?.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} perPage={PER_PAGE} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate startpage
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  const totalRes = await fetch(`${API_URL}/events/count`);

  const total = await totalRes.json();

  return {
    props: {
      events,
      page: +page,
      total,
    },
  };
}
