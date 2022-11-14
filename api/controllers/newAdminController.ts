import User from "../model/User";
import bcrypt from "bcrypt";
import os from "os";
import { BOTWAY_CONFIG_PATH } from "../config/constants";

export const newAdmin = async () => {
  const user = os.userInfo().username;
  const pwd = require(BOTWAY_CONFIG_PATH).user.token;

  // if (!user || !pwd)
  //   return res
  //     .status(400)
  //     .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();

  if (!duplicate) {
    try {
      // encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      // create and store the new user
      const result = await User.create({
        username: user,
        roles: { Admin: 5150 },
        password: hashedPwd,
      });

      console.log(`The admin user (${user}) is created!`);
    } catch (err: any) {
      // res.status(500).json({ message: err.message });
      console.log(err.message);
    }
  }
};
