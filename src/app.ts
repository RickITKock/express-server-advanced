import express, { Application } from "express";

const todos = [
  { id: "1", todo: "Todo list item 1" },
  { id: "2", todo: "Todo list item 2" },
];

const app: Application = express();

app.use(express.json());

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.get("/todos/:id", (req, res) => {
  res.status(200).send(todos.find((todos) => todos.id === req.params.id));
});

export default app;
