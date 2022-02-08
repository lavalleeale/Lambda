/// <reference types="cypress" />
import { generateKey, createCleartextMessage, sign } from "openpgp";

describe("Login", async () => {
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
    cy.task("db:seed");
  });
  it("should navigate to the login page", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Login").click();

    cy.url().should("include", "/login");

    cy.get(".btn").contains("Login");
  });
  it("should sign up", () => {
    cy.getCookie("user").should("not.exist");
    cy.get("#sig").type(signedSignupMessage, { delay: 0 });
    cy.get(".btn").click();
    cy.getCookie("user").should("exist");
  });
  it("shoud login", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Login").click();
    cy.get("#sig").type(signedLoginMessage, { delay: 0 });
    cy.get(".btn").click();
    cy.getCookie("user").should("exist");
  });
});
