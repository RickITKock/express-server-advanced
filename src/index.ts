import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 8000;

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
