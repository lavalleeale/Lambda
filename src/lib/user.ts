import { parse } from "cookie";
import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";
import prisma from "./prisma";

export type userCookie = {
  id: string;
  name: string;
};

export function getId(req: IncomingMessage | undefined) {
  if (req && req.headers.cookie) {
    const cookie = parse(req.headers.cookie, {});
    if (cookie.user) {
      if (process.env.NODE_ENV === "production") {
        try {
          return jwt.verify(cookie.user, process.env.JWT_PRIVATE, {
            algorithms: ["HS256"],
          }) as userCookie;
        } catch (e) {
          return null;
        }
      } else {
        return jwt.decode(cookie.user) as userCookie;
      }
    }
  }
  return null;
}
export function getUser(req: IncomingMessage | undefined) {
  const user = getId(req);
  return user ? prisma?.user.findUnique({ where: { id: user.id } }) : null;
}
