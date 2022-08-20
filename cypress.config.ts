import { defineConfig } from "cypress";
import { readPrivateKey } from "openpgp";
import prisma from "./src/lib/prisma";

export default defineConfig({
  redirectionLimit: 100,
  e2e: {
    experimentalSessionAndOrigin: true,
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        "db:teardown": () => {
          return (async () => {
            await prisma!.comment.deleteMany();
            await prisma!.post.deleteMany();
            await prisma!.section.deleteMany();
            return await prisma!.user.deleteMany();
          })();
        },
        "db:seed": () => {
          const keyText = config.env.key;
          return (async () => {
            const key = await readPrivateKey({ armoredKey: keyText });
            await prisma!.user.create({
              data: {
                key: key.getKeyID().toHex(),
                name: "Tester",
                id: "Tester",
              },
            });
            return await prisma!.user.create({
              data: {
                key: "test",
                name: "user2",
                id: "user2",
              },
            });
          })();
        },
      });
    },
  },
});
