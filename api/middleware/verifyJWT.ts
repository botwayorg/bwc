import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/constants";

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403); // invalid token

    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;

    next();
  });
};
