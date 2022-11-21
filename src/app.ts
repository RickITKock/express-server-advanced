import express, { Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/todos/", (req, res) => {
  res.send();
});

export default app;
