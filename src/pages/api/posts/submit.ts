// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getId } from "../../../lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let match = req.headers.referer?.match("/d/(.+)/submit");
  if (match) {
    const userId = getId(req);
    if (userId) {
      const post = await prisma!.post.create({
        data: {
          title: req.body.title,
          body: req.body.body,
          authorId: userId.id,
          sectionId: match[1],
        },
      });

      return res.status(200).redirect(`/posts/${post.id}`);
    }
  }
  return res.status(401).redirect("/posts/submit");
}
