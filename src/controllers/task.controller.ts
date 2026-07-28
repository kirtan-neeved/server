import type { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";

enum Priority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
}
type Tasks = {
  name: string;
  description: string;
  priority: Priority;
  date: Date;
};

let tasks: Tasks[] = [];

const createTask = (req: Request<{}, {}, Tasks, {}, {}>, res: Response) => {
  const { name, description, priority, date } = req.body;

  if (!name || name === "") {
    throw new ApiError(400, "Please provide name of task");
  }

  // add task to task array
  tasks.push({
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

export { createTask, getTasks };
