/// <reference types="cypress" />

import { PrismaClient } from "@prisma/client";
import { readPrivateKey } from "openpgp";

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
import prisma from "../../src/lib/prisma";

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// eslint-disable-next-line no-unused-vars
const pluginConfig: Cypress.PluginConfig = (on, config) => {
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
          data: { key: key.getKeyID().toHex(), name: "Tester" },
        });
      })();
    },
  });
};

export default pluginConfig;
