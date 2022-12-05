import express, { Application } from "express";
import { z } from "zod";
import { logger } from "./logger";
import { Todo, Todos } from "./models/Todo";

type Todo = z.infer<typeof Todo>;
type Todos = z.infer<typeof Todos>;

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
    const idParam = req.query.id || req.params.id;
    let foundTodos: Array<Todo> = [];
    if (typeof idParam === "string") {
      const idParamSplit = idParam.split(",").map((split) => split.trim());
      foundTodos = todos.filter((todo) => {
        return idParamSplit.includes(todo.id.trim());
      });
      const parsedFoundTodos = Todos.safeParse(foundTodos);
      if (parsedFoundTodos.success) {
        if (foundTodos.length > 1) {
          res.status(200).send(foundTodos);
        } else {
          const parsedFoundTodo = Todo.safeParse(foundTodos[0]);
          if (parsedFoundTodo.success) {
            res.status(200).send(foundTodos[0]);
          } else {
            throw parsedFoundTodo;
          }
        }
      }
      throw parsedFoundTodos;
    }
    res.status(400).send("Bad request");
  } catch (err) {
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

app.delete("/todos/:id", (req, res) => {
  try {
    const foundTodo = todos.find((todo) => todo.id === req.params.id);
    const parsedFoundTodo = Todo.safeParse(foundTodo);
    if (parsedFoundTodo.success) {
      res.status(204).send();
    }
    throw parsedFoundTodo;
  } catch (err) {
    logger.error(err);
    res.status(404).send("Not Found");
  }
});

export default app;
