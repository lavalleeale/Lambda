/// <reference types="cypress" />

describe("Test menu options", () => {
  beforeEach(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
  });

  it("should test both options exist", () => {
    cy.task("db:createPost", {
      title: "Post",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 1,
    });

    cy.login();
    cy.visit("");
    cy.get(".menu").should("exist");
  });

  it("should test only crossposting exists", () => {
    cy.task("db:createPost", {
      title: "Post",
      body: "",
      section: "ReallyCool",
      owner: "user2",
      upsNum: 1,
    });

    cy.login();
    cy.visit("");
    cy.get(".menu").should("not.exist");
    cy.contains("Crosspost").should("exist");
  });

  it("should test no options exist", () => {
    cy.visit("");
    cy.get(".menu").should("not.exist");
    cy.contains("Crosspost").should("not.exist");
    cy.contains("Delete").should("not.exist");
  });
});

export {};
