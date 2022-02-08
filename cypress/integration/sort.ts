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
      cy.get(".bg-slate-800 > .text-gray-500").should("contain", "1");
    });
  });
  it("should test first order", () => {
    cy.visit("localhost:3000/");
    cy.get(postSelector(1)).should("contain", "Post 2");
    cy.get(postSelector(2)).should("contain", "Post 1");
    cy.get(postSelector(3)).should("contain", "Post 0");
  });
  it("should upvote posts", () => {
    cy.get(upvoteSelector(2)).click();
    cy.get(upvoteSelector(3)).click();
  });
  it("should test second order", () => {
    cy.visit("localhost:3000/");
    cy.get(postSelector(1)).should("contain", "Post 1");
    cy.get(postSelector(2)).should("contain", "Post 0");
    cy.get(postSelector(3)).should("contain", "Post 2");
  });
});

function postSelector(position: number) {
  return `:nth-child(${position * 2}) > .flex > :nth-child(1) > .text-2xl`;
}

function upvoteSelector(position: number) {
  return `:nth-child(${position * 2}) > .bg-slate-800 > .block > .w-6`;
}

export {};
