import { defineConfig } from "cypress";
import { readPrivateKey } from "openpgp";
import prisma from "./src/lib/prisma";

type PostCreationInput = {
  title: string;
  body: string;
  section: string;
  owner: string;
  upsNum?: number;
};

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
            return await prisma!.user.create({
              data: {
                key: key.getKeyID().toHex(),
                name: "Tester",
                id: "Tester",
              },
            });
          })();
        },
        "db:createSection": ({
          name,
          owner,
        }: {
          name: string;
          owner: string;
        }) => {
          return (async () => {
            return await prisma!.section.create({
              data: {
                name: name,
                moderators: {
                  connectOrCreate: {
                    where: { name: owner },
                    create: { name: owner, key: owner },
                  },
                },
              },
            });
          })();
        },
        "db:createPost": async ({
          title,
          body,
          section,
          owner,
          upsNum,
        }: PostCreationInput) => {
          return await prisma!.post.create({
            data: {
              title,
              body,
              author: {
                connectOrCreate: {
                  where: { name: owner },
                  create: { name: owner, key: owner },
                },
              },
              section: {
                connectOrCreate: {
                  where: { name: section },
                  create: { name: section },
                },
              },
              upsNum,
            },
          });
        },
      });
    },
  },
});
