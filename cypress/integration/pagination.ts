/// <reference types="cypress" />

describe("Test Pagination", () => {
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
    cy.wrap(Array.from({ length: 25 })).each((_, index) => {
      cy.visit("localhost:3000/d/ReallyCool");
      cy.contains("Create Post").click();
      cy.get("#title").type(`Post ${index}`);
      cy.get(".btn").click();
      cy.contains(`Post ${index}`).should("exist");
      cy.contains("Section: d/ReallyCool").should("exist");
      cy.get(".dark\\:bg-slate-800 > .text-gray-500").should("contain", "1");
    });
  });
  it("should test first page", () => {
    cy.visit("localhost:3000/");
    postSelector(1).should("contain", "Post 24");
    postSelector(10).should("contain", "Post 15");
  });
  it("should second page", () => {
    cy.contains(">").click();
    postSelector(1).should("contain", "Post 14");
    postSelector(10).should("contain", "Post 5");
  });
  it("should test third page", () => {
    cy.contains(">").click();
    cy.contains(">").click();
    postSelector(1).should("contain", "Post 4");
    postSelector(5).should("contain", "Post 0");
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
