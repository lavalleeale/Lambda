// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
    if (!message.getText().match(/I am .+ and I wish to login/)) {
      return res.status(401).redirect("/login");
    }

    const key = message.getSigningKeyIDs()[0].toHex();
    const user = await prisma!.user.upsert({
      where: { key },
      create: {
        key,
        name: message.getText().match(/I am (.+) and I wish to login/)![1],
      },
      update: {},
    });

    if (user === null) {
      return res.status(401).redirect("/login");
    }

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

  res.status(401).redirect("/login");
}
