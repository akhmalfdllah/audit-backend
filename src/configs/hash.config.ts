import { Options, argon2id } from "argon2";
import { ARGON_SECRET_KEY, ARGON_SALT } from "./env.config";

type ArgonHashOptions = Options & { raw?: boolean };
type ArgonVerifyOptions = { secret?: Buffer };

export const ArgonHashOptions: ArgonHashOptions = {
  type: argon2id,
  memoryCost: 2 ** 16,
  parallelism: 1,
  hashLength: 16,
  secret: Buffer.from(ARGON_SECRET_KEY),
  salt: Buffer.from(ARGON_SALT),
};

export const ArgonVerifyOptions: ArgonVerifyOptions = {
  secret: Buffer.from(ARGON_SECRET_KEY),
};
