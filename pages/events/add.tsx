import { parseCookie } from '@/lib/index';
import Layout from '@/components/layout';
import styles from '@/styles/Form.module.css';
import { useState, ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSidePropsResult } from 'next';
import { NextApiRequest } from 'next';

type ServerProps = {
  req: NextApiRequest;
};

type pageProps = {
  token: string;
};

export default function AddEventPage({ token }: pageProps) {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
      return;
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error('Something went wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  return (
    <Layout title='Add new event'>
      <Link href='/events'>Go back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Event performers</label>
            <input
              type='text'
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Event venue</label>
            <input
              type='text'
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Event address</label>
            <input
              type='text'
              id='address'
              name='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Event date</label>
            <input
              type='date'
              id='date'
              name='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Event time</label>
            <input
              type='text'
              id='time'
              name='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <label htmlFor='description'>Event description</label>
        <textarea
          name='description'
          id='description'
          value={values.description}
          onChange={handleInputChange}></textarea>
        <input type='submit' value='Add event' className='btn' />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({
  req,
}: ServerProps): Promise<GetServerSidePropsResult<pageProps>> {
  const { token } = parseCookie(req);

  return {
    props: {
      token,
    },
  };
}
