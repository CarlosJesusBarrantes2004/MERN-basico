import axios from "axios";

const URL = "http://localhost:3000/tasks";

export const getTasksRequest = async () => await axios.get(URL);

export const getTaskRequest = async (id) => await axios.get(URL + "/" + id);

export const createTaskRequest = async (task) => await axios.post(URL, task);

export const updateTaskRequest = async (id, task) =>
  await axios.put(URL + "/" + id, task);

export const deleteTaskRequest = async (id) =>
  await axios.delete(URL + "/" + id);

export const toggleTaskRequest = async (id, done) =>
  await axios.put(URL + "/" + id, { task_done: done });
