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
      cy.get(".dark\\:bg-slate-800 > .text-gray-500").should("contain", "1");
    });
  });
  it("should test first order", () => {
    cy.visit("localhost:3000/");
    postSelector(1).should("contain", "Post 2");
    postSelector(2).should("contain", "Post 1");
    postSelector(3).should("contain", "Post 0");
  });
  it("should upvote posts", () => {
    upvoteSelector(2).click();
    upvoteSelector(3).click();
  });
  it("should test second order", () => {
    cy.visit("localhost:3000/");
    postSelector(1).should("contain", "Post 1");
    postSelector(2).should("contain", "Post 0");
    postSelector(3).should("contain", "Post 2");
  });
});

function postSelector(position: number) {
  return cy.get(".grow > > .text-2xl").eq(position - 1);
}

function upvoteSelector(position: number) {
  return cy
    .get(".paper > .dark\\:bg-slate-800 > .block > .w-6")
    .eq(position - 1);
}

export {};
