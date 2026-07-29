import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { Router } from "express";

const router: Router = Router();

router.route("/tasks").post(createTask).get(getAllTasks);

router.route("/tasks/:taskId").delete(deleteTask).patch(updateTask);

export default router;
