export const JwtRefreshCookieName = 'refresh_token';

export const JwtRefreshCookieOptions = {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'strict',
    path: '/',
    maxAge: parseInt(process.env.COOKIE_MAX_AGE || '604800000'),
};
