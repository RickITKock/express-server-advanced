import request from "supertest";
import { Todo, Todos } from "../models/Todo";
import { string, z } from "zod";
import app from "../app";

type Todo = z.infer<typeof Todo>;
type Todos = z.infer<typeof Todos>;

describe("Todos API", () => {
  it("GET (200) /todos --> Array of todos", async () => {
    const response = await request(app).get(`/todos`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(Array<Todo>()));
  });

  it("GET (200) /todos/:id --> Single todo item", async () => {
    const todoId = 2;
    const response = await request(app).get(`/todos/${todoId}`);
    expect(response.status).toBe(200);
    expect(Todo.safeParse(response.body).success).toBe(true);
  });

  it("GET (200) /todos/:id --> Mutliple todo items by ids", async () => {
    const todoIds = [1, 2];
    const response = await request(app).get(
      `/todos/id?id=${todoIds[0]}, ${todoIds[1]}`
    );
    expect(response.status).toBe(200);
    expect(Todos.safeParse(response.body).success).toBe(true);
  });

  it("GET (404) /todos/:id --> Not Found Error", async () => {
    const todoId = 5;
    const response = await request(app).get(`/todos/${todoId}`);
    console.log(response.body);
    expect(Todo.safeParse(response.body).success).toBe(false);
    expect(response.status).toBe(404);
  });

  it("POST (200) /todos --> Create a new Todo", async () => {
    const todosResponse = await request(app).get(`/todos`);
    const arrayOfTodos = todosResponse.body || [];
    const updatedTodo: Todo = {
      id: `${arrayOfTodos.length - 1}`,
      todo: "Updated todo item",
    };
    const response = await request(app).post(`/todos`).send(updatedTodo);
    expect(response.status).toBe(200);
    expect(Todo.safeParse(response.body).success).toBe(true);
    expect(response.body).toEqual(updatedTodo);
  });

  it("PUT (200) /todos --> Update a Todo", async () => {
    const todosResponse = await request(app).get(`/todos`);
    const arrayOfTodos = todosResponse.body || [];
    const newTodo: Todo = {
      id: `${arrayOfTodos.length + 1}`,
      todo: "New todo item",
    };
    const response = await request(app).put(`/todos`).send(newTodo);
    expect(response.status).toBe(200);
    expect(Todo.safeParse(response.body).success).toBe(true);
    expect(response.body).toEqual(newTodo);
  });

  it("POST (400) /todos --> Bad request", async () => {
    const todosResponse = await request(app).get(`/todos`);
    const arrayOfTodos = todosResponse.body || [];
    const invalidTodo: any = {
      id: `${arrayOfTodos.length + 1}`,
      todod: "New todo item",
    };
    const response = await request(app).post(`/todos`).send(invalidTodo);
    expect(response.status).toBe(400);
    expect(Todo.safeParse(response.body).success).toBe(false);
  });

  it("DELETE (204) /todos --> Delete a Todo", async () => {
    const todosResponse = await request(app).get(`/todos`);
    const arrayOfTodos = todosResponse.body || [];
    const id = arrayOfTodos.length + 1;
    const newTodo: Todo = {
      id: `${id}`,
      todo: "New todo item 2",
    };
    const response = await request(app).post(`/todos`).send(newTodo);
    const deleteTodo = await request(app).delete(`/todos/${id}`).send(newTodo);
    expect(deleteTodo.status).toBe(204);
  });

  it("DELETE (404) /todos/:id --> Not Found Error", async () => {
    const todoId = 5;
    const response = await request(app).delete(`/todos/${todoId}`);
    expect(Todo.safeParse(response.body).success).toBe(false);
    expect(response.status).toBe(404);
  });
});
