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
      select: {
        author: { select: { id: true } },
        section: {
          select: { name: true, moderators: { where: { id: userId } } },
        },
      },
    });
    if (post) {
      if (post.section.moderators.length === 1 || post.author.id === userId) {
        await prisma!.post.delete({
          where: { id: req.query.id as string },
        });
        res.redirect(`/d/${post.section.name}`);
        return;
      } else {
        res.redirect(req.headers.referer ?? "/");
        return;
      }
    }
  }
);
