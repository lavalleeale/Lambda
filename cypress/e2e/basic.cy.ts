/// <reference types="cypress" />

describe("Basic Funcitonality", () => {
  beforeEach(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
    cy.login();
  });

  it("should create section", () => {
    cy.visit("");
    cy.contains("Create Section").click();
    cy.get("#name").type(`ReallyCool`);
    cy.get(".btn").click();
    cy.url().should("contain", `/d/ReallyCool`);
    cy.get("#sidebar").should("contain", "u/Tester");
    cy.contains("No Posts Found").should("exist");
  });

  it("should create post", () => {
    cy.task("db:createSection", { name: "ReallyCool", owner: "Tester" });
    cy.visit("d/ReallyCool");
    cy.contains("Create Post").click();
    cy.get("#title").type("Test Post");
    cy.get("#body").type(
      "This is a really long post body that will be a good test to make sure the text truncates but that will only work 100% of the time if the post is *very* long and there is no chance that the screen will be big enough to fit all of this text so this text is a long ramble in order to make sure everything works",
      { delay: 0 }
    );
    cy.get(".btn").click();
    cy.get(".menu").should("exist");
    cy.contains("d/ReallyCool").should("exist");
    cy.contains("u/Tester").should("exist");
  });
});

export {};
