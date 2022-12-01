import request from "supertest";

import app from "../app";

describe("Todos API", () => {
  const todosStub = [
    { id: "1", todo: "Todo list item 1" },
    { id: "2", todo: "Todo list item 2" },
  ];

  it("GET /todos --> Array of todos", async () => {
    const response = await request(app).get(`/todos`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(todosStub));
  });

  // it("GET /todos/id --> specific todo by ID", () => {});
  it("GET /todos/:id --> Single todo item", async () => {
    const todoId = 2;
    const response = await request(app).get(`/todos/${todoId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(todosStub[todoId - 1]);
  });

  // it("POST /todos --> created todo", () => {});

  // it("GET /todos --> validates request body", () => {});
});
