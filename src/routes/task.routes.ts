import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { Router } from "express";

const router = Router();

router.route("/tasks").post(createTask).get(getTasks);

router.route("/tasks/:taskId").delete(deleteTask).patch(updateTask);

export default router;
