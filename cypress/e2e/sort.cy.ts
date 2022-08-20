/// <reference types="cypress" />

describe("Test Sorting", () => {
  beforeEach(() => {
    cy.task("db:teardown");
    cy.task("db:seed");
    cy.login();
  });
  it("should test initial order", () => {
    cy.task("db:createPost", {
      title: "Post 0",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 1,
    });
    cy.task("db:createPost", {
      title: "Post 1",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 1,
    });
    cy.task("db:createPost", {
      title: "Post 2",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 1,
    });
    cy.visit("/d/ReallyCool");
    checkOrder(2, 1, 0);
  });

  it("should test upvoting changes order", () => {
    cy.task("db:createPost", {
      title: "Post 0",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 2,
    });
    cy.task("db:createPost", {
      title: "Post 1",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 2,
    });
    cy.task("db:createPost", {
      title: "Post 2",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 1,
    });
    cy.visit("/d/ReallyCool");
    checkOrder(1, 0, 2);
  });

  it("should test selecting order", () => {
    cy.task("db:createPost", {
      title: "Post 0",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 2,
    });
    cy.task("db:createPost", {
      title: "Post 1",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 2,
    });
    cy.task("db:createPost", {
      title: "Post 2",
      body: "",
      section: "ReallyCool",
      owner: "Tester",
      upsNum: 1,
    });
    cy.visit("/d/ReallyCool");
    cy.contains("Old").click();
    cy.url().should("contain", "sort=old");
    checkOrder(0, 1, 2);
    cy.contains("New").click();
    cy.url().should("contain", "sort=new");
    checkOrder(2, 1, 0);
    cy.contains("Top").click();
    cy.url().should("contain", "sort=top");
    checkPost(3, 2);
  });
});

function checkOrder(first: number, second: number, third: number) {
  checkPost(1, first);
  checkPost(2, second);
  checkPost(3, third);
}

function checkPost(pos: number, value: number) {
  postSelector(pos).should("contain", `Post ${value}`);
}

function postSelector(position: number) {
  return cy.get(".grow > > .text-2xl").eq(position - 1);
}

function upvoteSelector(position: number) {
  return cy.get('[href$="updoot"]').eq(position - 1);
}

export {};
