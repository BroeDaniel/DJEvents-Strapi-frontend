import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext, MouseEvent } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import styles from '@/styles/AuthForm.module.css';
import AuthContext from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(Object.values(error)[0]);
  }, [error]);

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title='User login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log in
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email address</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type='submit' value='Login' className='btn' />
        </form>
        <p>
          Don't have an account?
          <Link href='/account/register'> Register here</Link>
        </p>
      </div>
    </Layout>
  );
}
