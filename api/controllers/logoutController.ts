const fsPromises = require("fs").promises;
import { BWDB_PATH } from "../config/constants";
import { bwdb } from "./db";

export const handleLogout = async (req: any, res: any) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = bwdb.admin.find(
    (person: any) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  const otherAdmins = bwdb.admin.filter(
    (person: any) => person.refreshToken !== foundUser.refreshToken
  );

  const currentUser = { ...foundUser, refreshToken: "" };

  bwdb.setAdmin([...otherAdmins, currentUser]);

  await fsPromises.writeFile(BWDB_PATH, JSON.stringify(bwdb.admin));

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.sendStatus(204);
};
