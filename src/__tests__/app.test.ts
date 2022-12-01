import request from "supertest";
import { Todo } from "../models/Todo";
import { z } from "zod";
import app from "../app";

type Todo = z.infer<typeof Todo>;

describe("Todos API", () => {
  it("GET /todos --> Array of todos", async () => {
    // Given
    // When
    const response = await request(app).get(`/todos`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(Array<Todo>()));
  });

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
});
