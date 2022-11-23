import path from "path";
import fs from "fs";

export const HOMEDIR: any = process.env.HOME || process.env.USERPROFILE;
export const DOT_BOTWAY_PATH = path.join(HOMEDIR, ".botway");
export const BOTWAY_RSA: any = path.join(DOT_BOTWAY_PATH, "keys", "bwrsa.rsa");
export const BOTWAY_RSA_PUB: any = path.join(
  DOT_BOTWAY_PATH,
  "keys",
  "bwrsa-pub.rsa"
);

export let publicKey = fs.readFileSync(BOTWAY_RSA_PUB).toString();

export let privateKey = fs.readFileSync(BOTWAY_RSA).toString();
