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
    const section = await prisma?.section.findUnique({
      where: { name: req.query.name as string },
      select: {
        moderators: { where: { id: userId }, select: { id: true } },
      },
    });
    if (section) {
      if (section.moderators.length === 1) {
        await prisma!.section.delete({
          where: { name: req.query.name as string },
        });
        res.redirect(`/`);
        return;
      } else {
        res.redirect(req.headers.referer ?? "/");
        return;
      }
    }
  }
);
