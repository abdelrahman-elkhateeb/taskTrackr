import express from "express";

const router = express.Router();

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

router.get("/", getTasks).post("/", createTask);
router.delete("/:id", deleteTask).put("/:id", updateTask);

export default router;
