import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext, MouseEvent } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import Layout from '@/components/layout';
import styles from '@/styles/AuthForm.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { register, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(Object.values(error)[0]);
  }, [error]);

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    } else {
      register({ username, email, password });
    }
  };

  return (
    <Layout title='User registration'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <div>
            <label htmlFor='passwordConfirm'>Confirm password</label>
            <input
              type='password'
              id='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type='submit' value='Register' className='btn' />
        </form>
        <p>
          Already have an account?
          <Link href='/account/login'> Login here</Link>
        </p>
      </div>
    </Layout>
  );
}
