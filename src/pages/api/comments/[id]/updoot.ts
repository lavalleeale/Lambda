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
    const comment = await prisma?.comment.findUnique({
      where: { id: req.query.id as string },
      select: { ups: { where: { id: userId } } },
    });

    if (comment) {
      if (comment.ups.length === 0) {
        await prisma?.comment.update({
          where: { id: req.query.id as string },
          data: { upsNum: { increment: 1 }, ups: { connect: { id: userId } } },
        });
        res.redirect(req.headers.referer ?? "/");
        return;
      } else {
        await prisma?.comment.update({
          where: { id: req.query.id as string },
          data: {
            upsNum: { decrement: 1 },
            ups: { disconnect: { id: userId } },
          },
        });
        res.redirect(req.headers.referer ?? "/");
        return;
      }
    }
  }
);
