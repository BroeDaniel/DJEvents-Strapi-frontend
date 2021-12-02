import type { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/config/index';
var cookie = require('cookie');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    //   Destroy cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json({ message: 'cookie destroyed and logged out' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `method ${req.method} not allowed` });
  }
};
