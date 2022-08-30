// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { withSessionRoute } from "../../../lib/user";

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const userId = req.session.user?.id;
      if (userId) {
        const section = await prisma!.section.create({
          data: {
            name: req.body.name,
            moderators: { connect: { id: userId } },
          },
        });
        res.status(200).redirect(`/d/${section.name}`);
        return;
      } else {
        res.status(401).redirect("/d/create");
        return;
      }
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        res.status(400).redirect(`/d/create?error=${e.code}`);
        return;
      }
      throw e;
    }
  }
);
