import { createTask, getTasks } from "../controllers/task.controller.js";
import { Router } from "express";


const router = Router()


router.route("/tasks").post(createTask).get(getTasks)

export default router;