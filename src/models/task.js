import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["created", "processing", "completed"],
      default: "created",
    },
    deadline: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists before defining it
const Task = mongoose.models?.Task || mongoose.model("Task", taskSchema);

export default Task;
