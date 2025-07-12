import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "no description added!!" },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;

