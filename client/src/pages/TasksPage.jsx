import { useEffect } from "react";
import Task from "../components/Task";
import { useTasks } from "../context/TaskProvider";

const TasksPage = () => {
  const { tasks, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5">
      {tasks.length ? (
        tasks.map((task) => <Task key={task.id} task={task}></Task>)
      ) : (
        <p className="text-white font-bold text-xl">No tasks yet</p>
      )}
    </div>
  );
};

export default TasksPage;
