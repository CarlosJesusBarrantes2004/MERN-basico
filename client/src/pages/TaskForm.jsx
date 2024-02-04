import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    params.id
      ? await updateTask(params.id, {
          task_title: data.title,
          task_description: data.description,
        })
      : await createTask(data);
    navigate("/");
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const res = await getTask(params.id);
        setValue("title", res.title);
        setValue("description", res.description);
      }
    };
    loadTask();
  }, [setValue, params.id, getTask]);

  return (
    <>
      <h1 className="form-title">
        {params.id ? "Update task" : "Create task"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:bg-slate-800 px-3 py-5 w-1/3 mx-auto"
      >
        <div className="flex flex-col mb-2">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Write a title..."
            {...register("title", { required: true })}
            className="form-input"
          />
        </div>
        {errors.title?.type === "required" && (
          <p className="form-error">Field required.</p>
        )}
        <div className="flex flex-col mb-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            placeholder="Write a description..."
            {...register("description", { required: true })}
            className="form-input resize-none"
          ></textarea>
        </div>
        {errors.description?.type === "required" && (
          <p className="form-error">Field required.</p>
        )}
        <div className="flex justify-center mt-3">
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
