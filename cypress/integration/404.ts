/// <reference types="cypress" />

describe("Test Error Pages", () => {
  before(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
  });
  beforeEach(cy.login);

  it("should view 404", () => {
    cy.visit("localhost:3000/posts/1", { failOnStatusCode: false });
    cy.contains("Page Not Found!").should("be.visible");
  });
});

export {};
