import mongoose, { Schema } from "mongoose";
import { type Tasks } from "../types/tasks.types.js";

const taskSchema= new Schema<Tasks>({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema)