import type { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import { generateId } from "../utils/generateRandomId.js";
import type { Tasks, TasksParams } from "../types/tasks.types.js";
import { containsId } from "../utils/containsId.js";
import { isEmptyString } from "../utils/isEmptyString.js";

let tasks: Tasks[] = [];

const createTask = (req: Request<{}, {}, Tasks, {}, {}>, res: Response) => {
  const { name, description, priority } = req.body;

  if (!name || name === "") {
    throw new ApiError(400, "Please provide name of task");
  }

  // generating random id for this task
  const taskId = generateId();

  // add task to task array
  tasks.push({
    taskId,
    name,
    description,
    priority,
    date: new Date(),
  });

  return res.status(201).json({
    success: true,
    message: "Task added successfully",
  });
};

const getTasks = (req: Request, res: Response) => {
  if (tasks.length === 0)
    return res.status(201).json({
      success: true,
      message: "No task has been added yet.",
      data: [],
    });

  return res.status(201).json({
    success: true,
    message: "Task fetched successfully.",
    data: tasks,
  });
};

const deleteTask = (req: Request<TasksParams>, res: Response) => {
  const { taskId } = req.params;

 // =========== Edge cases ===========
 
 // if no string has been passed by user
  if(isEmptyString(taskId))
    throw new ApiError(400, "Task id is required for updating task details.")
  
  // if task does not exists for this id
  if(!containsId(taskId, tasks))
    throw new ApiError(404, "Task not found for this id")

  // ===================================

  // remove from tasks array
  tasks = tasks.filter((t) => t.taskId !== taskId)

  return res.status(200).json({
    success: true,
    message:`Task deleted successfully for taskId: ${taskId}`
  });
};

export { createTask, getTasks };
