// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getId, getUser } from "../../../../lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getId(req);
  if (!user) {
    return res.status(401).redirect(req.headers.referer ?? "/");
  }
  const post = await prisma?.post.findUnique({
    where: { id: req.query.id as string },
    select: { ups: { where: { id: user.id } } },
  });

  if (post) {
    if (post.ups.length === 0) {
      await prisma?.post.update({
        where: { id: req.query.id as string },
        data: { upsNum: { increment: 1 }, ups: { connect: { id: user.id } } },
      });
      return res.redirect(req.headers.referer ?? "/");
    } else {
      await prisma?.post.update({
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
