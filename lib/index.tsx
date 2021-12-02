var cookie = require('cookie');
import type { NextApiRequest } from 'next';

export function parseCookie(req: NextApiRequest) {
  return cookie.parse(req ? req.headers.cookie || '' : '');
}
