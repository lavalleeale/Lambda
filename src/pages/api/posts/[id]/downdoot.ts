// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { withSessionRoute } from "../../../../lib/user";

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.session.user?.id;
    if (!userId) {
      res.status(401).redirect(req.headers.referer ?? "/");
      return;
    }
    const post = await prisma?.post.findUnique({
      where: { id: req.query.id as string },
      select: { downs: { where: { id: userId } } },
    });
    if (post) {
      if (post.downs.length === 0) {
        await prisma?.post.update({
          where: { id: req.query.id as string },
          data: {
            downsNum: { increment: 1 },
            downs: { connect: { id: userId } },
          },
        });
        res.redirect(req.headers.referer ?? "/");
        return;
      } else {
        await prisma?.post.update({
          where: { id: req.query.id as string },
          data: {
            downsNum: { decrement: 1 },
            downs: { disconnect: { id: userId } },
          },
        });
        res.redirect(req.headers.referer ?? "/");
        return;
      }
    }
  }
);
