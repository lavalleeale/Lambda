/// <reference types="cypress" />

describe("Test Error Pages", () => {
  before(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
  });

  it("should view 404", () => {
    cy.visit("/posts/1", { failOnStatusCode: false });
    cy.contains("Page Not Found!").should("be.visible");
  });
});

export {};
