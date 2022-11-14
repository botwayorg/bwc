import User from "../model/User";

import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config/constants";

export const handleRefreshToken = async (req: any, res: any) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  const foundUser: any = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(refreshToken, REFRESH_TOKEN, async (err: any, decoded: any) => {
      if (err) return res.sendStatus(403); //Forbidden

      // Delete refresh tokens of hacked user
      const hackedUser: any = await User.findOne({
        username: decoded.username,
      }).exec();

      hackedUser.refreshToken = [];

      const result = await hackedUser.save();
    });

    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt: any) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(refreshToken, REFRESH_TOKEN, async (err: any, decoded: any) => {
    if (err) {
      // expired refresh token
      foundUser.refreshToken = [...newRefreshTokenArray];

      const result = await foundUser.save();
    }

    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    // Refresh token was still valid
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      ACCESS_TOKEN,
      { expiresIn: "10s" }
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      REFRESH_TOKEN,
      { expiresIn: "15s" }
    );

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  });
};
