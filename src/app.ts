import express, { Application } from "express";
import { z } from "zod";
import { Todo } from "./models/Todo";

type Todo = z.infer<typeof Todo>;

const todos: Array<Todo> = [
  { id: "1", todo: "Todo list item 1" },
  { id: "2", todo: "Todo list item 2" },
];

const app: Application = express();

app.use(express.json());

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.get("/todos/:id", (req, res) => {
  try {
    const foundTodo = todos.find((todo) => todo.id === req.params.id);
    const parsedFoundTodo = Todo.safeParse(foundTodo);
    if (parsedFoundTodo.success) {
      res.status(200).send(foundTodo);
    }
    throw parsedFoundTodo;
  } catch (err) {
    console.error(err);
    res.status(404).send("Not Found");
  }
});

export default app;
