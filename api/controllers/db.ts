import { BWDB_PATH } from "../config/constants";

export const bwdb = {
  admin: require(BWDB_PATH),
  setAdmin: function (data: any) {
    this.admin = data;
  },
};
