/// <reference types="cypress" />
import { createCleartextMessage, generateKey, sign } from "openpgp";

describe("Test Authentication", () => {
  before(() => {
    cy.task("db:teardown");
  });

  it("should sign up", () => {
    generateKey({
      userIDs: [{ name: "Testing User", email: "TestingUser@test.com" }],
      format: "object",
    }).then(({ privateKey }) => {
      createCleartextMessage({
        text: "I am AuthTester and I wish to login",
      }).then((loginMessage) => {
        sign({
          message: loginMessage,
          signingKeys: privateKey,
        }).then((signedLoginMessage) => {
          cy.visit("");
          cy.getCookie("user").should("not.exist");
          cy.get('label[for$="modal-checkbox"]').click();
          cy.get("#sig").type(signedLoginMessage, { delay: 0 });
          cy.get(".btn").click();
          cy.getCookie("user").should("exist");
        });
      });
    });
  });
});
