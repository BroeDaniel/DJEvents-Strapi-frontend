import { parseCookie } from '@/lib/index';
import Layout from '@/components/layout';
import Modal from '@/components/Modal';
import { FaImage } from 'react-icons/fa';
import styles from '@/styles/Form.module.css';
import { useState, ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/config/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSidePropsResult } from 'next';
import moment from 'moment';
import ImageUpload from '../../../components/ImageUpload';
import { NextApiRequest } from 'next';

type Params = {
  params: {
    id: string;
  };
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
  evt: JSONValue;
  token: string;
};

export default function EditEventPage({ evt, token }: pageProps) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();

    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

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

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('Unautorized');
        return;
      }
      toast.error('Something went wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  return (
    <Layout title='Edit event'>
      <Link href='/events'>Go back</Link>
      <h1>Edit Event</h1>
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
              value={moment(values.date).format('yyyy-MM-DD')}
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
        <input type='submit' value='Update event' className='btn' />
      </form>

      <h2>Event image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className='btn-secondary' onClick={() => setShowModal(true)}>
          <FaImage /> Set image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({
  params: { id },
  req,
}: Params): Promise<GetServerSidePropsResult<pageProps>> {
  const { token } = parseCookie(req);
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evt,
      token,
    },
  };
}
