/// <reference types="cypress" />

import { createCleartextMessage, readPrivateKey, sign } from "openpgp";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
  cy.session("Tester", () => {
    cy.wrap(null).then(
      /*{ timeout: 10000 }, */ async () => {
        const keyText = Cypress.env("key");
        const key = await readPrivateKey({ armoredKey: keyText });
        const loginMessage = await createCleartextMessage({
          text: "I am Tester and I wish to login",
        });
        const signedLoginMessage = await sign({
          message: loginMessage, // CleartextMessage or Message object
          signingKeys: key,
        });
        cy.visit("");
        cy.contains("Login").click();
        cy.get("#sig").type(signedLoginMessage, { delay: 0 });
        cy.contains("Login / Sign up").click();
        cy.getCookie("user").should("exist");
      }
    );
  });
});

export {};
