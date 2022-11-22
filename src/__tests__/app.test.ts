import request from "supertest";

import app from "../app";

describe("Todos API", () => {
  const todosStub = [
    { todo: "Todo list item 1" },
    { todo: "Todo list item 2" },
  ];

  it("GET /todos --> array todos", async () => {
    const response = await request(app).get(`/todos`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(todosStub));
  });

  // it("GET /todos/id --> specific todo by ID", () => {});

  // it("POST /todos --> created todo", () => {});

  // it("GET /todos --> validates request body", () => {});
});
