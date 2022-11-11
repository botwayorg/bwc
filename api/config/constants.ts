import path from "path";

export const HOMEDIR: any = process.env.HOME || process.env.USERPROFILE;
export const DOT_BOTWAY_PATH = path.join(HOMEDIR, ".botway");
export const BWDB_PATH: any = path.join(DOT_BOTWAY_PATH, "bwdb.json");
export const BOTWAY_CONFIG_PATH: any = path.join(
  DOT_BOTWAY_PATH,
  "botway.json"
);

export const ACCESS_TOKEN = require(BOTWAY_CONFIG_PATH).user.access_token;
export const REFRESH_TOKEN = require(BOTWAY_CONFIG_PATH).user.refresh_token;
