import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { withSessionRoute } from "../../../../lib/user";

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body.name) {
      const userId = req.session.user?.id;
      if (userId) {
        const user = await prisma!.user.findUnique({
          where: { id: userId },
          select: { sections: { select: { name: true } } },
        });
        if (user?.sections.some((section) => section.name === req.body.name)) {
          res.status(401).redirect(req.headers.referer ?? "/");
        }
        await prisma!.section.update({
          where: { name: req.query.name as string },
          data: { moderators: { connect: { name: req.body.name } } },
        });
        res.status(200).redirect(req.headers.referer ?? "/");
        return;
      }
      res.status(401).redirect(req.headers.referer ?? "/");
      return;
    }
    res.status(400).redirect(req.headers.referer ?? "/");
    return;
  }
);
