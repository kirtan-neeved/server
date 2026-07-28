import type { Tasks } from "../types/tasks.types.js";

export const containsId = (taskId: string, tasks: Tasks[]) => {

  for (let task of tasks) {
    if (task.taskId === taskId) return true;
  }

  return false;
};
