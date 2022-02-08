/// <reference types="cypress" />

describe("Test Sorting", () => {
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

  it("should create posts", () => {
    cy.wrap(Array.from({ length: 3 })).each((_, index) => {
      cy.visit("localhost:3000/d/ReallyCool");
      cy.contains("Create Post").click();
      cy.get("#title").type(`Post ${index}`);
      cy.get(".btn").click();
      cy.contains(`Post ${index}`).should("exist");
      cy.contains("Section: d/ReallyCool").should("exist");
      cy.contains("Score: 1").should("exist");
    });
  });
  it("should test first order", () => {
    cy.visit("localhost:3000/");
    cy.get(":nth-child(2) > .w-full > .text-2xl").should("contain", "Post 2");
    cy.get(":nth-child(4) > .w-full > .text-2xl").should("contain", "Post 1");
    cy.get(":nth-child(6) > .w-full > .text-2xl").should("contain", "Post 0");
  });
  it("should upvote posts", () => {
    cy.get(
      ":nth-child(4) > .bg-slate-800 > .block > .bi-arrow-up-square"
    ).click();
    cy.get(
      ":nth-child(6) > .bg-slate-800 > .block > .bi-arrow-up-square"
    ).click();
  });
  it("should test second order", () => {
    cy.visit("localhost:3000/");
    cy.get(":nth-child(2) > .w-full > .text-2xl").should("contain", "Post 1");
    cy.get(":nth-child(4) > .w-full > .text-2xl").should("contain", "Post 0");
    cy.get(":nth-child(6) > .w-full > .text-2xl").should("contain", "Post 2");
  });
});

export {};
