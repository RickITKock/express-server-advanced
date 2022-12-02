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
  const foundTodo = todos.find((todo) => todo.id === req.params.id);
  // console.log(foundTodo);
  const parsedFoundTodo = Todo.safeParse(foundTodo);
  // console.log(parsedFoundTodo);
  if (!parsedFoundTodo.success) {
    // console.log(parsedFoundTodo);
    res.status(404).send("Not Found");
  }
  res.status(200).send(foundTodo);
});

export default app;
