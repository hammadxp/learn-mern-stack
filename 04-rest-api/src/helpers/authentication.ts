import crypto from "crypto";

const SECRET = "HAMMAD-REST-API"; // acts as a secret key for password encryption

export const generateRandomString = () => crypto.randomBytes(128).toString("base64"); // generates a random string

export const encryptString = (password: string, salt: string) => {
  return crypto.createHmac("sha256", [password, salt].join("/")).update(SECRET).digest("hex"); // returns encrypted password in hexadecimal format
};
