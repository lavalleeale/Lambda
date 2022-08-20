/// <reference types="cypress" />

describe("Test Pagination", () => {
  beforeEach(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
    cy.login();
  });

  it("should test first page", () => {
    cy.wrap(Array.from({ length: 21 })).each((_, index) => {
      cy.task("db:createPost", {
        title: `Post ${index}`,
        body: "",
        section: "ReallyCool",
        owner: "Tester",
        upsNum: 1,
      });
    });

    cy.visit("");
    postSelector(1).should("contain", "Post 20");
    postSelector(10).should("contain", "Post 11");
  });

  it("should test second page", () => {
    cy.wrap(Array.from({ length: 21 })).each((_, index) => {
      cy.task("db:createPost", {
        title: `Post ${index}`,
        body: "",
        section: "ReallyCool",
        owner: "Tester",
        upsNum: 1,
      });
    });

    cy.visit("");
    cy.contains(">").click();
    cy.url().should("contain", "page=1");
    postSelector(1).should("contain", "Post 10");
    postSelector(10).should("contain", "Post 1");
  });

  it("should test third page", () => {
    cy.wrap(Array.from({ length: 21 })).each((_, index) => {
      cy.task("db:createPost", {
        title: `Post ${index}`,
        body: "",
        section: "ReallyCool",
        owner: "Tester",
        upsNum: 1,
      });
    });

    cy.visit("");
    cy.contains(">").click();
    cy.url().should("contain", "page=1");
    cy.contains(">").click();
    cy.url().should("contain", "page=2");
    postSelector(1).should("contain", "Post 0");
  });
});

function postSelector(position: number) {
  return cy.get(".grow > > .text-2xl").eq(position - 1);
}

export {};
