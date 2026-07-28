enum Priority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
}

type Tasks = {
  taskId: string;
  name: string;
  description: string;
  priority: Priority;
  date: Date;
};

type TasksParams = {
  taskId: string;
};


export type {
    Tasks,
    TasksParams
}