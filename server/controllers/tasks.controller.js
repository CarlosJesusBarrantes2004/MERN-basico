import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks ORDER BY task_createdAt ASC;"
    );

    res.json(
      result.map((task) => ({
        id: task.task_id,
        title: task.task_title,
        description: task.task_description,
        done: task.task_done,
        createdAt: task.task_createdAt,
      }))
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks WHERE task_id = ?;",
      [req.params.id]
    );

    if (!result.length)
      return res.status(404).json({ message: "Task not found." });

    res.json({
      id: result[0].task_id,
      title: result[0].task_title,
      description: result[0].task_description,
      done: result[0].task_done,
      createdAt: result[0].task_createdAt,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    await pool.query(
      "INSERT INTO tasks (task_title,task_description) VALUES (?,?);",
      [title, description]
    );
    res.status(201).json({ message: "New task created." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE tasks SET ? WHERE task_id = ?;", [
      req.body,
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found." });

    res.json({ message: "Task updated successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE task_id = ?;", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found." });

    res.json({ message: "Task deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
