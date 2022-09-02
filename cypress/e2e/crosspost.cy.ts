/// <reference types="cypress" />

describe("Test Crossposting", () => {
  before(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
  });

  beforeEach(cy.login);

  it("should crosspost", () => {
    cy.task("db:createPost", {
      title: "Post",
      body: "Body",
      section: "from",
      owner: "Tester",
      upsNum: 1,
    });
    cy.task("db:createSection", { name: "to", owner: "Tester" });

    cy.visit("");
    cy.contains("\u2807").click();
    cy.contains("Crosspost").click({ force: true });
    cy.get(".textfield").type("to");
    cy.get(".btn").click();
    cy.contains("Body").should("exist");
    cy.contains("d/to").should("exist");
    cy.visit("");
    cy.get("[id$=menu]").should("have.length", 2);
  });
});

export {};
