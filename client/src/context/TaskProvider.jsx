import { useState, useContext } from "react";
import TaskContext from "./TaskContext";
import {
  deleteTaskRequest,
  getTasksRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
  toggleTaskRequest,
} from "../api/tasks.api";

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTasks mut be used within a TaskContextProvider.");
  return context;
};

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  const createTask = async (data) => {
    try {
      const res = await createTaskRequest(data);
      console.log(res.data.message);
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      console.log(res.data.message);
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await updateTaskRequest(id, data);
      console.log(res.data.message);
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find((task) => task.id === id);

      const res = await toggleTaskRequest(
        id,
        (taskFound.done = taskFound.done ? false : true)
      );
      console.log(res.data.message);

      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return { ...task, done: taskFound.done };
          } else return task;
        })
      );
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        loadTasks,
        createTask,
        getTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
