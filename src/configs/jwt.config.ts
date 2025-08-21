import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // 🔍 debug
  return {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  };
});



// export const JwtAccessName = JWT_ACCESS_NAME;
// export const JwtAccessSecretKey = JWT_ACCESS_SECRET_KEY;
// export const JwtAccessSignOptions: JwtSignOptions = {
//   secret: JWT_ACCESS_SECRET_KEY,
//   expiresIn: JWT_ACCESS_EXPIRE_IN,
// };

// export const JwtRefreshName = JWT_REFRESH_NAME;
// export const JwtRefreshSecretKey = JWT_REFRESH_SECRECT_KEY;
// export const JwtRefreshSignOptions: JwtSignOptions = {
//   secret: JWT_REFRESH_SECRECT_KEY,
//   expiresIn: JWT_REFRESH_EXPIRE_IN,
// };



// custom-jwt
// export const JwtCommonSecretKey = JWT_COMMON_SECRECT_KEY;
// export const JwtCommonSignOptions: JwtSignOptions = {
//   secret: JWT_COMMON_SECRECT_KEY,
//   expiresIn: JWT_COMMON_EXPIRE_IN,
// };
