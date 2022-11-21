import request from "supertest";

import app from "../app";

describe("Todos API", () => {
  const rootUrl = "";

  it("GET /todos --> array todos", async () => {
    const response = await request(app).get(`${rootUrl}/todos`);
    expect(response.status).toBe(200);
  });

  // it("GET /todos/id --> specific todo by ID", () => {});

  // it("POST /todos --> created todo", () => {});

  // it("GET /todos --> validates request body", () => {});
});
