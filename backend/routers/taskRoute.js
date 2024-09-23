import express from "express";

const router = express.Router();

import {
  getTasks,
  createTask,
  deletedTask,
  updateTask,
} from "../controller/taskController.js";

router.get("/", getTasks).post("/", createTask);
router.delete("/:id", deletedTask).put("/:id", updateTask);

export default router;
