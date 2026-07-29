import type { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import { generateId } from "../utils/generateRandomId.js";
import type { Tasks, TasksParams } from "../types/tasks.types.js";
import { containsId } from "../utils/containsId.js";
import { isEmptyString } from "../utils/isEmptyString.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateMongoId } from "../utils/validateMongoId.js";

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

const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const allTasks = await Task.find({});

  if (allTasks.length === 0)
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No task has been added yet."));

  return res
    .status(200)
    .json(new ApiResponse(200, allTasks, "Task fetched successfully"));
});

const deleteTask = asyncHandler(
  async (req: Request<TasksParams>, res: Response) => {
    const { taskId } = req.params;

    // =========== Edge cases ===========

    // if id is empty or invalid
    validateMongoId(taskId);
    // ===================================

    const foundTask = await Task.findById(taskId);

    if (!foundTask) throw new ApiError(404, "No task found for this id");

    // delete task
    const deletedTask = await Task.findByIdAndDelete(taskId);
    console.log(deleteTask);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          `Task deleted successfully for taskId: ${taskId}`,
        ),
      );
  },
);

const updateTask = asyncHandler(
  async (req: Request<TasksParams, {}, Tasks>, res: Response) => {
    const { taskId } = req.params;
    const { name, description, priority } = req.body;

    // =========== Edge cases ===========

    // validating ID
    validateMongoId(taskId);

    // if task name is empty
    if (isEmptyString(name))
      throw new ApiError(400, "Task name id required for updating task.");

    // ===================================
    const foundTask = await Task.findById(taskId);

    if (!foundTask) throw new ApiError(404, "No task found for this id");

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        name,
        description,
        priority,
      },
      { returnDocument: "after" },
    );

    if (!updateTask)
      throw new ApiError(500, "Something went wrong while updating task");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedTask,
          "Task details has been updated successfully.",
        ),
      );
  },
);

export { createTask, getAllTasks, deleteTask, updateTask };
