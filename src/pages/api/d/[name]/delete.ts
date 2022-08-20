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
  const section = await prisma?.section.findUnique({
    where: { name: req.query.name as string },
    select: {
      moderators: { where: { id: user.id }, select: { id: true } },
    },
  });
  if (section) {
    if (section.moderators.length === 1) {
      await prisma!.section.delete({
        where: { name: req.query.name as string },
      });
      return res.redirect(`/`);
    } else {
      return res.redirect(req.headers.referer ?? "/");
    }
  }
}
