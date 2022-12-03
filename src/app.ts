import express, { Application } from "express";
import { z } from "zod";
import { logger } from "./logger";
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
    logger.error(err);
    res.status(404).send("Not Found");
  }
});

app.post("/todos", (req, res) => {
  try {
    const newTodo = req.body;
    const parsedNewTodo = Todo.safeParse(newTodo);
    if (parsedNewTodo.success) {
      todos.push(newTodo);

      res.status(200).send(newTodo);
    }
    throw parsedNewTodo;
  } catch (err) {
    logger.error(err);
    res.status(400).send("Bad Request");
  }
});

export default app;
