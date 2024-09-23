import express from "express";
import {
  getTasks,
  createTask,
  deleteTask,
<<<<<<< HEAD
  updateTask } from "../controllers/taskController.js";
const router = express.Router();


=======
  updateTask,
} from "../controllers/taskController.js";
>>>>>>> 6dae81f65fd539bf1adbc9eb836fe60dc88d7838

router.get("/", getTasks).post("/", createTask);
router.delete("/:id", deleteTask).put("/:id", updateTask);

export default router;
