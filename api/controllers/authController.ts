import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const fsPromises = require("fs").promises;
import { BWDB_PATH } from "../config/constants";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config/constants";
import { bwdb } from "./db";

export const handleLogin = async (req: any, res: any) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = bwdb.admin.find((person: any) => person.username === user);

  if (!foundUser) return res.sendStatus(401); // Unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      ACCESS_TOKEN,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      REFRESH_TOKEN,
      { expiresIn: "1d" }
    );

    // Saving refreshToken with current user
    const otherAdmins = bwdb.admin.filter(
      (person: any) => person.username !== foundUser.username
    );

    const currentUser = { ...foundUser, refreshToken };

    bwdb.setAdmin([...otherAdmins, currentUser]);

    await fsPromises.writeFile(BWDB_PATH, JSON.stringify(bwdb.admin));

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};
