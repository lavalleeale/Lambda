import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getId } from "../../../../lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body.postId && req.body.body && req.body.commentId) {
    const userId = getId(req);
    if (userId) {
      const parent = await prisma!.comment.findUnique({
        where: { id: req.body.commentId },
        select: { depth: true },
      });
      if (parent) {
        const comment = await prisma!.comment.create({
          data: {
            depth: parent!.depth + 1,
            body: req.body.body,
            postId: req.body.postId,
            parentId: req.body.commentId,
            authorId: userId.id,
          },
        });
        return res.status(200).redirect(`/posts/${comment.postId}`);
      }
      return res.status(400).redirect(req.headers.referer || "/");
    }
    return res.status(401).redirect("/");
  }
  return res.status(400).redirect("/");
}
