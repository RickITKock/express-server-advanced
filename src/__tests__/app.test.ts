import request from "supertest";
import { Todo } from "../models/Todo";
import { z } from "zod";
import app from "../app";

type Todo = z.infer<typeof Todo>;

describe("Todos API", () => {
  const todosStub: Array<Todo> = [
    { id: "1", todo: "Todo list item 1" },
    { id: "2", todo: "Todo list item 2" },
  ];

  it("GET /todos --> Array of todos", async () => {
    const response = await request(app).get(`/todos`);
    expect(response.status).toBe(200);
    // expect(response.body).toEqual(expect.arrayContaining(todosStub));
  });

  // it("GET /todos/id --> specific todo by ID", () => {});
  it("GET /todos/:id --> Single todo item", async () => {
    // Given
    const todoId = 2;

    // When
    const response = await request(app).get(`/todos/${todoId}`);

    // Then
    expect(response.status).toBe(200);
    expect(Todo.safeParse(response.body).success).toBe(true);
  });

  // it("POST /todos --> created todo", () => {});

  // it("GET /todos --> validates request body", () => {});
});
