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
    cy.get('[href^="/posts"]:visible').click();
    getCommentField(0).type(`Depth: ${0}`);
    getCommentSubmitButton(0).click();
    cy.wrap(Array.from({ length: 4 })).each((_, index) => {
      getAddComment(index).click();
      getCommentField(index + 1).type(`Depth: ${index + 1}`);
      getCommentSubmitButton(1).click();
    });
    cy.get(".pl-10 > .pl-10 > .pl-10 > .pl-10").should("contain", "Depth: 4");
  });
});

function getAddComment(number: number) {
  return cy.get(".modal-checker ~ label").eq(number);
}
function getCommentField(number: number) {
  return cy.get('input[name="body"]').eq(number);
}
function getCommentSubmitButton(number: number) {
  return cy.get(".btn:visible").eq(number);
}

export {};
