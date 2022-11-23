import { privateKey, publicKey } from "./constants";

const dbUri: any = process.env.MONGO_URL || "";

export default {
  port: 1337,
  origin: "http://localhost:3000",
  dbUri,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: publicKey,
  privateKey: privateKey,
};
