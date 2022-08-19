/// <reference types="cypress" />

describe("Test top sections view", () => {
  before(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
  });

  beforeEach(cy.login);

  it("should create sections", () => {
    cy.wrap(Array.from({ length: 6 })).each((_, index) => {
      cy.visit("");
      cy.get("#sidebar > div > a").should("have.length", index);
      cy.get(".btn-pill").click();
      cy.get("#name").type(`test${index}`);
      cy.get(".btn").click();
      cy.url().should("contain", `test${index}`);
    });
  });

  it("should test initial order", () => {
    cy.visit("");
    cy.get("#sidebar > div > a").should("have.length", "5");
  });

  it("should test order changes", () => {
    cy.wrap(Array.from({ length: 6 })).each((_, index) => {
      cy.wrap(Array.from({ length: index + 1 })).each((_, count) => {
        cy.visit(`/d/test${index}/submit`);
        cy.get("#title").type(`Post ${count}`);
        cy.get(".btn").click();
        cy.contains(`Post`).should("exist");
      });
      cy.visit("");
      cy.get("#sidebar > div > a")
        .eq(0)
        .should("contain.text", `d/test${index}`);
    });
  });
});

export {};
