// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getId } from "../../../lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = getId(req);
    if (userId) {
      const section = await prisma!.section.create({
        data: {
          name: req.body.name,
          moderators: { connect: { id: userId.id } },
        },
      });
      return res.status(200).redirect(`/d/${section.name}`);
    } else {
      return res.status(401).redirect("/d/create");
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.status(400).redirect(`/d/create?error=${e.code}`);
    }
    throw e;
  }
}
