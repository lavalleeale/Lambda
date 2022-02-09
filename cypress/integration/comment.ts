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
    cy.get(".w-3\\/4 > :nth-child(1) > .paper").click();
    cy.get(".flex > :nth-child(1) > div.float-right").click();
    cy.get("#body").type("Cool Parent Comment");
    cy.get(".btn").click();
    cy.get(":nth-child(2) > div.float-right").click();
    cy.get(
      ":nth-child(2) > div.float-right > .modal > .paper > label > #body"
    ).type("Cool Child Comment");
    cy.get(":nth-child(2) > div.float-right > .modal > .paper > .btn").click();
    cy.get(".pl-10").should("contain", "Cool Child Comment");
  });
});

export {};
