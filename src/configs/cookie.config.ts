import { registerAs } from '@nestjs/config';

export default registerAs('cookie', () => ({
  name: process.env.COOKIE_NAME || 'refresh_token',
  secure: process.env.COOKIE_SECURE === 'true',
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  path: '/',
  maxAge: parseInt(process.env.COOKIE_MAX_AGE || '604800000'), // 7 hari
}));
