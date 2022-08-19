import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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
          authorId: user.id,
        },
      });
      return res.redirect(`/posts/${newPost!.id}`);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        return res.redirect(
          req.headers.referer
            ? `${req.headers.referer!.replace(/\?.+/, "")}?error=${e.code}`
            : "/"
        );
      }
    }
  }
  res.redirect(req.headers.referer ?? "/");
}
