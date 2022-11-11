import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config/constants";
import { bwdb } from "./db";

export const handleRefreshToken = (req: any, res: any) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = bwdb.admin.find(
    (person: any) => person.refreshToken === refreshToken
  );

  if (!foundUser) return res.sendStatus(403); // Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, REFRESH_TOKEN, (err: any, decoded: any) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      ACCESS_TOKEN,
      { expiresIn: "30s" }
    );

    res.json({ accessToken });
  });
};
