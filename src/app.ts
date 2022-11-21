import express, { Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/todos", (req, res) => {
  res.send([{ todo: "Todo list item 1" }, { todo: "Todo list item 2" }]);
});

export default app;
