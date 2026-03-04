import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const TaskEdit = () => {

  const [task, setTask] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {

    const fetchTask = async () => {
      try {
        const res = await api.get(`/task/find/${id}`);
        setTask(res.data.data);
      } catch (error) {
        toast.error("Failed to load task",error);
      }
    };

    fetchTask();

  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/task/update/${id}`, task);
      toast.success("Task updated successfully");
      navigate("/task");
    } catch (error) {
      toast.error("Update failed",error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Task
          </h2>

          <Link
            to="/task"
            className="text-sm text-blue-600 hover:underline"
          >
            Back
          </Link>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Task Name
            </label>

            <input
              type="text"
              name="task_name"
              value={task.task_name || ""}
              onChange={inputHandler}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter task name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Priority
            </label>

            <select
              name="priority"
              value={task.priority || ""}
              onChange={inputHandler}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Status
            </label>

            <select
              name="status"
              value={task.status || ""}
              onChange={inputHandler}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Due Date
            </label>

            <input
              type="date"
              name="due_date"
              value={task.due_date || ""}
              onChange={inputHandler}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Update Task
          </button>

        </form>

      </div>

    </div>
  );
};

export default TaskEdit;