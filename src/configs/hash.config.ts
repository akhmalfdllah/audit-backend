import { registerAs } from '@nestjs/config';

// export default registerAs('hash', () => ({
//   secretKey: process.env.ARGON_SECRET_KEY,
//   salt: process.env.ARGON_SALT,
// }));

export default registerAs('hash', () => ({
  secretKey: process.env.ARGON_SECRET_KEY,
  salt: process.env.ARGON_SALT,
  timeCost: parseInt(process.env.ARGON_TIME_COST || '3'),
  memoryCost: parseInt(process.env.ARGON_MEMORY_COST || '65536'),
  parallelism: parseInt(process.env.ARGON_PARALLELISM || '1'),
}));
