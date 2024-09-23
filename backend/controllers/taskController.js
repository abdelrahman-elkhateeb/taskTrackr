import Task from "../models/taskModel.js";
import User from '../models/userModel.js';
import mongoose from "mongoose";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createTask = async (req, res) => {
  const { description, priority, dueDate, userId } = req.body;

  if (!description || !priority || !dueDate || !userId) {
    return res.status(400).json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const existingTask = await Task.findOne({ description });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "Task with this description already exists",
      });
    }

    const newTask = new Task({
      description,
      priority,
      dueDate,
      user: userId, 
    });

    const savedTask = await newTask.save();

    // Update the user's tasks array
    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

    res.status(201).json({ success: true, data: savedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error in creating task" });
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

export const getUserTasks = async (req, res) => {
  const { userId } = req.params; 

  try {
    const user = await User.findById(userId).populate('tasks'); 

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, tasks: user.tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
};
