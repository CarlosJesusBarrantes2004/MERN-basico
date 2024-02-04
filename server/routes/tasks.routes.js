import { Router } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";

const router = Router();

//get all tasks
router.get("/tasks", getTasks);

//get task by id
router.get("/tasks/:id", getTask);

//create new task
router.post("/tasks", createTask);

//update task
router.put("/tasks/:id", updateTask);

//delete task
router.delete("/tasks/:id", deleteTask);

export default router;
