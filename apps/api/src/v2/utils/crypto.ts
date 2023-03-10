import crypto from "node:crypto";

import argon2 from "argon2";
import jwt from "jsonwebtoken";

import SECRETS from "@/constants/secrets";

const { AUTH_SECRET } = SECRETS;

const hash = (plaintext: string): Promise<string> => argon2.hash(plaintext);

const verify = (plaintext: string, hash: string): Promise<boolean> =>
  argon2.verify(hash, plaintext);

const randomUUID = (): string => crypto.randomUUID();

const sign = (data: object): string =>
  jwt.sign({ data }, AUTH_SECRET, { expiresIn: "1d" });

// TODO
const decode = <PayloadData>(token: string) => {
  const payload = jwt.verify(token, AUTH_SECRET) as { data: PayloadData };

  return payload.data;
};

export default Object.freeze({
  hash,
  verify,
  randomUUID,
  jwt: {
    sign,
    decode,
  },
});
