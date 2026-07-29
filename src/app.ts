import express, {type Express} from "express";
import type { Request, Response, NextFunction } from "express"; // Importng type of Request and Response
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { temp } from "./controllers/test.controller.js";
import tasksRouter from "./routes/task.routes.js"


// assigning app to the Express type explicitly
const app: Express = express();

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

// using error handler
app.use(errorHandler)

export default app