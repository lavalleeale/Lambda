/// <reference types="cypress" />

describe("Test Crossposting", () => {
  before(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
  });

  beforeEach(cy.login);

  it("should create sections", () => {
    cy.wrap(Array.from({ length: 2 })).each((_, index) => {
      cy.visit("");
      cy.get(".btn-pill").click();
      cy.get("#name").type(index === 0 ? "from" : "to");
      cy.get(".btn").click();
      cy.url().should("contain", index === 0 ? "from" : "to");
      cy.get("#sidebar").should("contain", "u/Tester");
    });
  });

  it("should create post", () => {
    cy.visit("/d/from");
    cy.contains("Create Post").click();
    cy.get("#title").type(`Post`);
    cy.get("#body").type("Body");
    cy.get(".btn").click();
    cy.contains(`Post`).should("exist");
  });

  it("should crosspost", () => {
    cy.visit("");
    cy.get(".menu-checker + label").click();
    cy.contains("Crosspost").click({ force: true });
    cy.get(".textfield").type("to");
    cy.get(".btn").click();
    cy.contains("Body").should("exist");
    cy.contains("d/to").should("exist");
  });

  it("should view both posts", () => {
    cy.visit("");
    cy.get(".menu-checker").should("have.length", 2);
  });
});

export {};
