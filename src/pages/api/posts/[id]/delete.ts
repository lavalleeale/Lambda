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
      section: { select: { name: true, User: { where: { id: user.id } } } },
    },
  });
  if (post) {
    if (post.section.User.length === 1) {
      await prisma!.post.delete({
        where: { id: req.query.id as string },
      });
      return res.redirect(`/d/${post.section.name}`);
    } else {
      return res.redirect(req.headers.referer ?? "/");
    }
  }
}
