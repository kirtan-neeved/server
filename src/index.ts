// function greet(name: string): string {
//   return `Hello ${name}`;
// }
// console.log(greet("Kirtan"));

import express from "express";
import type { Request, Response, NextFunction } from "express"; // Importng type of Request and Response
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { temp } from "./controllers/test.controller.js";
import tasksRouter from "./routes/task.routes.js"

// dotenv configuration for path declaration for env file
dotenv.config({ path: "./.env" });

// Get PORT from env. (Default value : 3000)
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json({ limit: "16kb" }));

// =========== Request Middleware ================
const requestMiddleWare = (req: Request, res: Response, next: NextFunction): void => { // defining custom middlware
  console.log(`Middleware executed : Method => ${req.method} | URL => ${req.url}`);
  next();
};

// using custom middleware (app.use). it will execute on every request responses.
app.use(requestMiddleWare)


app.get("/", (req: Request, res: Response) => {
  // using type for req and reponse as Request and Response respectively
  res.send("Hello");
});

app.use("/t", tasksRouter)


// Generic Request
app.get("/test/:id", temp)

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});


// using error handler
app.use(errorHandler)