import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { withSessionRoute } from "../../../../lib/user";

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body.postId && req.body.body) {
      const userId = req.session.user?.id;
      if (userId) {
        const comment = await prisma!.comment.create({
          data: {
            depth: 1,
            body: req.body.body,
            postId: req.body.postId,
            authorId: userId,
          },
        });

        res.status(200).redirect(`/posts/${comment.postId}`);
        return;
      }
      res.status(401).redirect("/");
      return;
    }
    res.status(400).redirect("/");
    return;
  }
);
