/// <reference types="cypress" />
import { generateKey, createCleartextMessage, sign } from "openpgp";

describe("Navigation", async () => {
  const key = await generateKey({
    userIDs: [{ name: "Testing User", email: "TestingUser@test.com" }],
    format: "object",
  });
  const signupMessage = await createCleartextMessage({
    text: "I am Tester and I wish to sign up",
  });
  const signedSignupMessage = await sign({
    message: signupMessage, // CleartextMessage or Message object
    signingKeys: key.privateKey,
  });
  const loginMessage = await createCleartextMessage({
    text: "I am Tester and I wish to login",
  });
  const signedLoginMessage = await sign({
    message: loginMessage, // CleartextMessage or Message object
    signingKeys: key.privateKey,
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
    Cypress.Cookies.preserveOnce("user");
  });
  it("should create section", () => {
    cy.get(".btn-pill").click();
    cy.get("#name").type("ReallyCool");
    cy.get(".btn").click();
    Cypress.Cookies.preserveOnce("user");
  });
  it("should create post", () => {
    cy.contains("Create Post").click();
    cy.get("#title").type("Cool Title");
    cy.get("#body").type("Cool Body");
    cy.get(".btn").click();
    cy.get(".text-3xl").contains("Cool Title");
    cy.get(".paper > p").contains("Cool Body");
    Cypress.Cookies.preserveOnce("user");
  });
  it("should view user", () => {
    cy.contains("u/Tester").click();
    cy.get("#__next > :nth-child(2)").should("exist");
  });
});

export {};
