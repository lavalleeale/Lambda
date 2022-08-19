// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  const comment = await prisma?.comment.findUnique({
    where: { id: req.query.id as string },
    select: { ups: { where: { id: user.id } } },
  });

  if (comment) {
    if (comment.ups.length === 0) {
      await prisma?.comment.update({
        where: { id: req.query.id as string },
        data: { upsNum: { increment: 1 }, ups: { connect: { id: user.id } } },
      });
      return res.redirect(req.headers.referer ?? "/");
    } else {
      await prisma?.comment.update({
        where: { id: req.query.id as string },
        data: {
          upsNum: { decrement: 1 },
          ups: { disconnect: { id: user.id } },
        },
      });
      return res.redirect(req.headers.referer ?? "/");
    }
  }
}
