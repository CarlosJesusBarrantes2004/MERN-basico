import express, { json } from "express";
import cors from "cors";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(json()); //parsea datos JSON en la solicitudes

app.use(indexRoutes);
app.use(taskRoutes);

app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
