/// <reference types="cypress" />

describe("Test Pagination", () => {
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
  });

  it("should create posts", () => {
    cy.wrap(Array.from({ length: 21 })).each((_, index) => {
      cy.visit("/d/ReallyCool/submit");
      cy.get("#title").type(`Post ${index}`, { delay: 0 });
      cy.get(".btn").click();
      cy.contains(`Post ${index}`).should("exist");
      cy.contains("d/ReallyCool").should("exist");
      cy.get(".dark\\:bg-slate-800 > .text-gray-500").should("contain", "1");
    });
  });

  it("should test first page", () => {
    cy.visit("");
    postSelector(1).should("contain", "Post 20");
    postSelector(10).should("contain", "Post 11");
  });

  it("should second page", () => {
    cy.visit("");
    cy.contains(">").click();
    cy.wait(500);
    postSelector(1).should("contain", "Post 10");
    postSelector(10).should("contain", "Post 1");
  });

  it("should test third page", () => {
    cy.visit("");
    cy.contains(">").click();
    cy.wait(500);
    cy.contains(">").click();
    cy.wait(500);
    postSelector(1).should("contain", "Post 0");
  });
});

function postSelector(position: number) {
  return cy.get(".grow > > .text-2xl").eq(position - 1);
}

export {};
