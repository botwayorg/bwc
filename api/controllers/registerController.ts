const fsPromises = require("fs").promises;
import bcrypt from "bcrypt";
import os from "os";
import { BWDB_PATH, BOTWAY_CONFIG_PATH } from "../config/constants";
import { bwdb } from "./db";

export const handleNewAdmin = async () => {
  const user = os.userInfo().username;
  const pwd = require(BOTWAY_CONFIG_PATH).user.token;

  // check for duplicate usernames in the db
  const duplicate = bwdb.admin.find((person: any) => person.username === user);

  if (!duplicate) {
    try {
      // encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      // store the new user
      const newUser = {
        username: user,
        roles: { User: 2001 },
        password: hashedPwd,
      };

      bwdb.setAdmin([...bwdb.admin, newUser]);

      await fsPromises.writeFile(BWDB_PATH, JSON.stringify(bwdb.admin));

      console.log(bwdb.admin);

      console.log(`The admin user (${user}) is created!`);
    } catch (err: any) {
      console.error(err.message);
    }
  }
};
