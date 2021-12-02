import Link from 'next/link';

type pageProps = {
  page: number;
  total: number;
  perPage: number;
};

export default function Pagination({ page, total, perPage }: pageProps) {
  const lastPage = Math.ceil(total / perPage);
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>Prev</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}
    </>
  );
}
