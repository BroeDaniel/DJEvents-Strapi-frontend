import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

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
};

export default function EventItem({ evt }: pageProps) {
  const {
    image,
    name,
    slug,
    venue,
    address,
    performers,
    date,
    time,
    description,
  } = evt;

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            image ? image.formats.thumbnail.url : '/images/event-default.png'
          }
          height={100}
          width={170}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(date).toLocaleDateString('en-DK')} at {time}
        </span>
        <h3>{name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
}
