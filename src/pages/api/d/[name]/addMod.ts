import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getId } from "../../../../lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body.name) {
    const userId = getId(req);
    if (userId) {
      await prisma!.section.update({
        where: { name: req.query.name as string },
        data: { moderators: { connect: { name: req.body.name } } },
      });

      return res.status(200).redirect(req.headers.referer ?? "/");
    }
    return res.status(401).redirect(req.headers.referer ?? "/");
  }
  return res.status(400).redirect(req.headers.referer ?? "/");
}
