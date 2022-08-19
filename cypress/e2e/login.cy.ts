/// <reference types="cypress" />
import { generateKey, createCleartextMessage, sign } from "openpgp";

describe("Test Authentication", async () => {
  const key = (
    await generateKey({
      userIDs: [{ name: "Testing User", email: "TestingUser@test.com" }],
      format: "object",
    })
  ).privateKey;
  const signupMessage = await createCleartextMessage({
    text: "I am AuthTester and I wish to sign up",
  });
  const signedSignupMessage = await sign({
    message: signupMessage,
    signingKeys: key,
  });
  const loginMessage = await createCleartextMessage({
    text: "I am AuthTester and I wish to login",
  });
  const signedLoginMessage = await sign({
    message: loginMessage,
    signingKeys: key,
  });

  before(() => {
    cy.task("db:teardown");
  });

  it("should sign up", () => {
    cy.visit("");
    cy.getCookie("user").should("not.exist");
    cy.contains("Login").click();
    cy.get("#sig").type(signedSignupMessage, { delay: 0 });
    cy.get(".btn").click();
    cy.getCookie("user").should("exist");
  });

  it("shoud login", () => {
    cy.visit("");
    cy.getCookie("user").should("not.exist");
    cy.contains("Login").click();
    cy.get("#sig").type(signedLoginMessage, { delay: 0 });
    cy.get(".btn").click();
    cy.getCookie("user").should("exist");
  });
});
