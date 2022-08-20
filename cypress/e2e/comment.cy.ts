/// <reference types="cypress" />

describe("Test Commenting", () => {
  beforeEach(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
    cy.login();
  });

  it("should add comments", () => {
    cy.task("db:createPost", {
      title: "Post",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 1,
    });

    cy.visit("");
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
