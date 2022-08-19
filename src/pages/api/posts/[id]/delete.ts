import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getId } from "../../../../lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getId(req);
  if (!user) {
    return res.status(401).redirect(req.headers.referer ?? "/");
  }
  const post = await prisma?.post.findUnique({
    where: { id: req.query.id as string },
    select: {
      author: { select: { id: true } },
      section: {
        select: { name: true, moderators: { where: { id: user.id } } },
      },
    },
  });
  if (post) {
    if (post.section.moderators.length === 1 || post.author.id === user.id) {
      await prisma!.post.delete({
        where: { id: req.query.id as string },
      });
      return res.redirect(`/d/${post.section.name}`);
    } else {
      return res.redirect(req.headers.referer ?? "/");
    }
  }
}
