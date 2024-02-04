import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";

const Task = ({ task }) => {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="task-card">
      <div className="flex justify-between">
        <h3 className="task-card-title">{task.title}</h3>
        <span>{task.done ? "✔️" : "❌"}</span>
      </div>
      <p className="task-card-description">{task.description}</p>
      <span className="task-card-date">{task.createdAt}</span>
      <div className="flex justify-between">
        <button className="btn" onClick={() => navigate("/edit/" + task.id)}>
          Edit
        </button>
        <button className="btn" onClick={async () => await deleteTask(task.id)}>
          Delete
        </button>
        <button
          className="btn"
          onClick={async () => await toggleTaskDone(task.id)}
        >
          Toggle task
        </button>
      </div>
    </div>
  );
};

export default Task;
