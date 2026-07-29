import type { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import { generateId } from "../utils/generateRandomId.js";
import type { Tasks, TasksParams } from "../types/tasks.types.js";
import { containsId } from "../utils/containsId.js";
import { isEmptyString } from "../utils/isEmptyString.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

let tasks: Tasks[] = [];

const createTask = asyncHandler(
  async (req: Request<{}, {}, Tasks, {}, {}>, res: Response) => {
    const { name, description, priority } = req.body;

    if (isEmptyString(name)) {
      throw new ApiError(400, "Please provide name of task");
    }

    const createdTask = await Task.create({
      name,
      description,
      priority,
    });

    if (!createdTask)
      throw new ApiError(500, "Something went wrong while creating task");

    const task = await Task.findById(createdTask._id);

    return res
      .status(201)
      .json(new ApiResponse(201, task, "Task added successfully."));
  },
);

const getTasks = (req: Request, res: Response) => {
  if (tasks.length === 0)
    return res.status(200).json({
      success: true,
      message: "No task has been added yet.",
      data: [],
    });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Task fetched successfully"));
};

const deleteTask = (req: Request<TasksParams>, res: Response) => {
  const { taskId } = req.params;

  // =========== Edge cases ===========

  // if no string has been passed by user
  if (isEmptyString(taskId))
    throw new ApiError(400, "Task id is required for updating task details.");

  // if task does not exists for this id
  if (!containsId(taskId, tasks))
    throw new ApiError(404, "Task not found for this id");

  // ===================================

  // remove from tasks array
  tasks = tasks.filter((t) => t.taskId !== taskId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        `Task deleted successfully for taskId: ${taskId}`,
      ),
    );
};

const updateTask = (req: Request<TasksParams, {}, Tasks>, res: Response) => {
  const { taskId } = req.params;
  const { name, description, priority } = req.body;

  // =========== Edge cases ===========

  // if no string has been passed by user
  if (isEmptyString(taskId))
    throw new ApiError(400, "Task id is required for updating task details.");

  // if task does not exists for this id
  if (!containsId(taskId, tasks))
    throw new ApiError(404, "Task not found for this id");

  // if task name is empty
  if (isEmptyString(name))
    throw new ApiError(400, "Task name id required for updating task.");

  // ===================================

  const targetTask = tasks.find((task) => task.taskId === taskId);

  if (targetTask) {
    targetTask.name = name;
    if (description) targetTask.description = description;
    if (priority) targetTask.priority = priority;
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        targetTask,
        "Task details has been updated successfully.",
      ),
    );
};

export { createTask, getTasks, deleteTask, updateTask };
