/// <reference types="cypress" />

describe("Test Commenting", () => {
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

  it("should create post", () => {
    cy.visit("localhost:3000/d/ReallyCool");
    cy.contains("Create Post").click();
    cy.get("#title").type(`Post`);
    cy.get(".btn").click();
    cy.contains(`Post`).should("exist");
    cy.contains("Section: d/ReallyCool").should("exist");
    cy.get(".dark\\:bg-slate-800 > .text-gray-500").should("contain", "1");
  });
  it("should add comment", () => {
    cy.get('[href^="/posts"]').click();
    cy.wrap(Array.from({ length: 5 })).each((_, index) => {
      getAddComment(index).click({ force: true });
      getCommentField(index).type(`Depth: ${index}`);
      getCommentSubmitButton(index).click();
    });
    cy.get(".pl-10 > .pl-10 > .pl-10 > .pl-10").should("contain", "Depth: 4");
  });
});

function getAddComment(number: number) {
  return cy.get('[type="checkbox"]').eq(number);
}
function getCommentField(number: number) {
  return cy.get('input[name="body"]').eq(number);
}
function getCommentSubmitButton(number: number) {
  return cy.get(".btn").eq(number);
}

export {};
