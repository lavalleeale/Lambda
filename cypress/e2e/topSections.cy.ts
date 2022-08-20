/// <reference types="cypress" />

describe("Test top sections view", () => {
  beforeEach(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
    cy.login();
  });

  it("should test initial order", () => {
    cy.wrap(Array.from({ length: 6 })).each((_, index) => {
      cy.task("db:createSection", { name: `test${index}`, owner: "Tester" });
    });
    cy.visit("");
    cy.get("#sidebar > div > a").should("have.length", "5");
  });

  it("should test order changes", () => {
    cy.wrap(Array.from({ length: 6 })).each((_, index) => {
      cy.wrap(Array.from({ length: index + 1 })).each((_, count) => {
        cy.task("db:createPost", {
          title: `Post ${count}`,
          body: "",
          section: `test${index}`,
          owner: "Tester",
          upsNum: 1,
        });
      });

      cy.visit("");
      cy.get("#sidebar > div > a")
        .eq(0)
        .should("contain.text", `d/test${index}`);
    });
  });
});

export {};
