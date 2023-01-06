import type { NextApiRequest, NextApiResponse } from "next";
import { readCleartextMessage, readSignature } from "openpgp";
import prisma from "../../lib/prisma";
import { withSessionRoute } from "../../lib/user";

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let message = await readCleartextMessage({
      cleartextMessage: req.body.sig,
    });

    let signatureText = (req.body.sig as string).match(
      /-----BEGIN PGP SIGNATURE-----[\S\s]+-----END PGP SIGNATURE-----/gm
    )![0];

    let signature = await readSignature({ armoredSignature: signatureText });

    if (
      signature.packets[0].created &&
      new Date().getTime() - signature.packets[0].created.getTime() < 30 * 1000
    ) {
      if (!message.getText().match(/I am .+ and I wish to login/)) {
        if (req.headers.referer && !req.headers.referer.includes("login")) {
          req.session.loginContinueTo = req.headers.referer;
          await req.session.save();
        }
        res.status(401).redirect("/login");
        return;
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
        if (req.headers.referer && !req.headers.referer.includes("login")) {
          req.session.loginContinueTo = req.headers.referer;
          await req.session.save();
        }
        res.status(401).redirect("/login");
        return;
      }

      req.session.user = { id: user.id, name: user.name };
      await req.session.save();

      res
        .status(200)
        .redirect(
          req.session.loginContinueTo ||
            (req.headers.referer && !req.headers.referer.includes("login"))
            ? req.headers.referer!
            : "/"
        );
      return;
    }

    res.status(401).redirect("/login");
  }
);
