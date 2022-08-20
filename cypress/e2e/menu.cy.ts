/// <reference types="cypress" />

describe("Test menu options", () => {
  before(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
  });

  it("should create section", () => {
    cy.login();
    cy.visit("");
    cy.get(".btn-pill").click();
    cy.get("#name").type("ReallyCool");
    cy.get(".btn").click();
    cy.url().should("contain", "ReallyCool");
    cy.get("#sidebar").should("contain", "u/Tester");
  });

  it("should create post", () => {
    cy.login();
    cy.visit("/d/ReallyCool");
    cy.contains("Create Post").click();
    cy.get("#title").type(`Post`);
    cy.get("#body").type("Body");
    cy.get(".btn").click();
    cy.contains(`Post`).should("exist");
  });

  it("should test both options exist", () => {
    cy.login();
    cy.visit("");
    cy.get(".menu").should("exist");
  });

  it("should test only crossposting exists", () => {
    cy.setCookie(
      "user",
      `${Buffer.from("{}", "utf-8")
        .toString("base64")
        .replaceAll("=", "")}.${Buffer.from(
        JSON.stringify({ id: "user2", name: "user2" }),
        "utf-8"
      )
        .toString("base64")
        .replaceAll("=", "")}.`
    );
    cy.visit("");
    cy.get(".menu").should("not.exist");
    cy.contains("Crosspost").should("exist");
  });

  it("should test no options exist", () => {
    cy.visit("");
    cy.get(".menu").should("not.exist");
    cy.contains("Crosspost").should("not.exist");
    cy.contains("Delete").should("not.exist");
  });
});

export {};
