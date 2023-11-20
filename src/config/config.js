import { config } from "dotenv";
config();

export default {
  persistence: process.env.persistence,
  port: process.env.port || 8080,
  url: process.env.url,
  dbName: process.env.dbName,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_callbackURL: process.env.GOOGLE_callbackURL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_callbackurl: process.env.GITHUB_callbackurl,
  ttl: process.env.ttl,
  secret: process.env.secret,
  privateKey: process.env.privateKey,
  USER: process.env.USER,
  PASS: process.env.PASS,
  AMBIENT: process.env.AMBIENT,
};
