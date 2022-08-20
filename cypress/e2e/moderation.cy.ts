/// <reference types="cypress" />

describe("Section Moderation", () => {
  beforeEach(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
    cy.login();
  });

  it("should add mod to section", () => {
    cy.task("db:createSection", { name: "ReallyCool", owner: "Tester" });
    cy.task("db:createPost", {
      title: "Post",
      body: "",
      section: "ReallyCool",
      owner: "user2",
      upsNum: 1,
    });

    cy.visit("d/ReallyCool");
    cy.get("#sidebar > .modal-checker ~ label").click();
    cy.get("#name").type("user2");
    cy.get(".btn").click();
    cy.get("#sidebar").should("contain", "u/user2");
  });

  it("should delete section", () => {
    cy.task("db:createSection", { name: "ReallyCool", owner: "Tester" });
    cy.task("db:createPost", {
      title: "Post",
      body: "",
      section: "ReallyCool",
      owner: "user2",
      upsNum: 1,
    });

    cy.visit("d/ReallyCool");
    cy.get("#sidebar").contains("Delete").click();
    cy.contains("No Posts Found").should("exist");
    cy.contains("d/").should("not.exist");
  });
});

export {};
