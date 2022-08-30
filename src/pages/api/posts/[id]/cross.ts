import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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
      select: { title: true, body: true },
    });
    if (typeof req.body.dest === "string" && post) {
      try {
        const newPost = await prisma?.post.create({
          data: {
            title: post.title,
            body: post.body,
            sectionId: req.body.dest.replace("d/", ""),
            authorId: userId,
          },
        });
        res.redirect(`/posts/${newPost!.id}`);
        return;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          res.redirect(
            req.headers.referer
              ? `${req.headers.referer!.replace(/\?.+/, "")}?error=${e.code}`
              : "/"
          );
          return;
        }
      }
    }
    res.redirect(req.headers.referer ?? "/");
    return;
  }
);
