/// <reference types="cypress" />

describe("Test Sorting", () => {
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
    cy.wrap(Array.from({ length: 3 })).each((_, index) => {
      cy.visit("/d/ReallyCool");
      cy.contains("Create Post").click();
      cy.get("#title").type(`Post ${index}`);
      cy.get(".btn").click();
      cy.contains(`Post ${index}`).should("exist");
      cy.contains("d/ReallyCool").should("exist");
      cy.get(".dark\\:bg-slate-800 > .text-gray-500").should("contain", "1");
    });
  });

  it("should test first order", () => {
    cy.visit("/d/ReallyCool");
    checkOrder(2, 1, 0);
  });

  it("should upvote posts", () => {
    cy.visit("/d/ReallyCool");
    upvoteSelector(2).click();
    upvoteSelector(3).click();
    cy.get(".orange").should("have.length", 2);
  });

  it("should test second order", () => {
    cy.visit("/d/ReallyCool");
    checkOrder(1, 0, 2);
  });

  it("should test selecting order", () => {
    cy.visit("/d/ReallyCool");
    cy.contains("Old").click();
    cy.wait(500);
    checkOrder(0, 1, 2);
    cy.contains("New").click();
    cy.wait(500);
    checkOrder(2, 1, 0);
    cy.contains("Top").click();
    cy.wait(500);
    checkPost(3, 2);
  });
});

function checkOrder(first: number, second: number, third: number) {
  checkPost(1, first);
  checkPost(2, second);
  checkPost(3, third);
}

function checkPost(pos: number, value: number) {
  postSelector(pos).should("contain", `Post ${value}`);
}

function postSelector(position: number) {
  return cy.get(".grow > > .text-2xl").eq(position - 1);
}

function upvoteSelector(position: number) {
  return cy.get('[href$="updoot"]').eq(position - 1);
}

export {};
