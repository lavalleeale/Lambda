/// <reference types="cypress" />

describe("Test Deleting", () => {
  before(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
  });

  beforeEach(cy.login);

  it("should create section", () => {
    cy.visit("");
    cy.get(".btn-pill").click();
    cy.get("#name").type("ReallyCool");
    cy.get(".btn").click();
    cy.url().should("contain", "ReallyCool");
    cy.get("#sidebar").should("contain", "u/Tester");
  });

  it("should create post", () => {
    cy.visit("/d/ReallyCool");
    cy.contains("Create Post").click();
    cy.get("#title").type(`Post`);
    cy.get("#body").type("Body");
    cy.get(".btn").click();
    cy.contains(`Post`).should("exist");
  });

  it("should delete post", () => {
    cy.visit("");
    cy.get(".menu-checker + label").click();
    cy.contains("Delete").click({ force: true });
    cy.contains("No Posts Found").should("exist");
  });
});

export {};
