import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '../config/index';

interface AppContextInterface {
  user: user | null;
  error: error | null;
  register: (user: user) => void;
  login: (user: user) => void;
  logout: () => void;
}

// TYPES

type ProviderProps = {
  children: ReactNode;
};

type user = {
  username?: string;
  email: string;
  password: string;
};

type error = {
  message: string;
};

const defaultValue = {
  user: null,
  error: null,
};

const AuthContext = createContext<AppContextInterface>(
  defaultValue as AppContextInterface
);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState(defaultValue.user);
  const [error, setError] = useState(defaultValue.error);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Register a user
  const register = async (user: user): Promise<void> => {
    // {username, email, password}
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    // Comes back from api/login route used for login form via login tsx where res.status.json is sunding the object that turns into data variable
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      console.log(data.message);
      setError(data);
    }
  };

  // Login user
  const login = async ({
    email: identifier,
    password,
  }: user): Promise<void> => {
    // First request Strapi via api/login
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });
    // Comes back from api/login route used for login form via login tsx where res.status.json is sunding the object that turns into data variable
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      console.log(data.message);
      setError(data);
    }
    // console.log(identifier, password);
  };

  // Logout user
  const logout = async (): Promise<void> => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  // Check is the user is logged in
  const checkUserLoggedIn = async (): Promise<void> => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
