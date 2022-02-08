/// <reference types="cypress" />

describe("Create Basic Post", () => {
  before(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
  });
  beforeEach(cy.login);

  it("should create section", () => {
    cy.visit("localhost:3000");
    cy.get(".btn-pill").click();
    cy.get("#name").type("ReallyCool");
    cy.get(".btn").click();
  });

  it("should create post", () => {
    cy.visit("localhost:3000/d/ReallyCool");
    cy.contains("Create Post").click();
    cy.get("#title").type("Cool Title");
    cy.get("#body").type("Cool Body");
    cy.get(".btn").click();
    cy.contains("Cool Title").should("exist");
    cy.contains("Cool Body").should("exist");
    cy.contains("Section: d/ReallyCool").should("exist");
    cy.contains("Score: 1").should("exist");
  });
  it("should view user", () => {
    cy.contains("u/Tester").click();
    cy.get("#__next > :nth-child(2)").should("exist");
  });
});

export {};
