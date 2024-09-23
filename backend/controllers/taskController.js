import Task from "../models/taskModel.js";
import mongoose from "mongoose";

export const getTasks = async (res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createTask = async (req, res) => {
  const task = req.body;
  if (!description || !priority) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all" });
  }
  const newTask = new Task(task);
  try {
    const savedTask = await newTask.save();
    res.status(201).json({ success: true, data: savedTask });
  } catch (err) {
    res.status(500).json({ success: false, message: "error in creating task" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const taskData = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, taskData, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTask });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "server Error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "task not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "task deleted successfully" });
  } catch (err) {
    console.log("error in deleting task:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
