
type Tasks = {
  taskId: string;
  name: string;
  description: string;
  priority: "Low" | "High" | "Medium";
  date: Date;
};

type TasksParams = {
  taskId: string;
};


export type {
    Tasks,
    TasksParams
}