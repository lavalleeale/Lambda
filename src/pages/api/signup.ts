// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { readCleartextMessage, readSignature } from "openpgp";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let message = await readCleartextMessage({ cleartextMessage: req.body.sig });

  let signatureText = (req.body.sig as string).match(
    /-----BEGIN PGP SIGNATURE-----[\S\s]+-----END PGP SIGNATURE-----/gm
  )![0];

  let signature = await readSignature({ armoredSignature: signatureText });

  if (
    signature.packets[0].created &&
    new Date().getTime() - signature.packets[0].created.getTime() < 30 * 1000
  ) {
    var user: User | null = null;

    if (message.getText().match(/I am .+ and I wish to sign up/)) {
      let key = message.getSigningKeyIDs()[0].toHex();
      user = await prisma!.user.create({
        data: {
          key,
          name: message.getText().match(/I am (.+) and I wish to sign up/)![1],
        },
      });
    } else if (message.getText().match(/I am .+ and I wish to login/)) {
      let key = message.getSigningKeyIDs()[0].toHex();
      user = await prisma!.user.findUnique({ where: { key } });
    }

    if (user) {
      const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.JWT_PRIVATE
      );
      res.setHeader(
        "Set-Cookie",
        serialize("user", token, {
          httpOnly: true,
          path: "/",
        })
      );

      return res.status(200).redirect(req.headers.referer ?? "/");
    }
  }

  res.status(401).redirect("/login");
}
