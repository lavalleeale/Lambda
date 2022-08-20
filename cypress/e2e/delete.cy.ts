/// <reference types="cypress" />

describe("Test Deleting", () => {
  beforeEach(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
    cy.login();
  });

  it("should delete post", () => {
    cy.task("db:createPost", {
      title: "Post",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 1,
    });

    cy.visit("");
    cy.get(".menu-checker + label").click();
    cy.contains("Delete").click({ force: true });
    cy.contains("No Posts Found").should("exist");
  });
});

export {};
