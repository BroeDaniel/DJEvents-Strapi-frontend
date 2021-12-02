import Layout from '@/components/layout';
import { MouseEvent } from 'react';
import { parseCookie } from '@/lib/index';
import { GetServerSidePropsResult } from 'next';
import { NextApiRequest } from 'next';
import { API_URL } from '../../config/index';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

type ServerProps = {
  req: NextApiRequest;
};

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

type pageProps = {
  events: JSONValue[];
  token: string;
};

export default function DashboardPage({ events, token }: pageProps) {
  const router = useRouter();

  const deleteEvent = async (id: string) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({
  req,
}: ServerProps): Promise<GetServerSidePropsResult<pageProps>> {
  const { token } = parseCookie(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: { events, token },
  };
}
