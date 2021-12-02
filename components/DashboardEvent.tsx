import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '@/styles/DashboardEvent.module.css';
import { MouseEvent } from 'react';

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
  handleDelete: (id: string) => void;
};

export default function DashboardEvent({ evt, handleDelete }: pageProps) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>{evt.name}</Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>
      <a
        href='#'
        className={styles.delete}
        onClick={() => handleDelete(evt.id)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
}
