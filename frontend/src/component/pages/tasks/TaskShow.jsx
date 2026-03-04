import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const TaskShow = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      const res = await api.get(`/task/find/${id}`);
      setTask(res.data.data);
    };

    fetchTask();
  }, [id]);

  const deleteHandler = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/task/delete/${id}`);
      toast.success("Task deleted");
      navigate("/task");
    } catch (error) {
      toast.error("Delete failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 border border-gray-200">

        <div className="flex justify-between items-center mb-8">

          <Link
            to="/task"
            className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Back
          </Link>

          <button
            onClick={deleteHandler}
            className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Delete
          </button>

        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-wide">
          Task Details
        </h2>

        <div className="space-y-5 text-gray-700">

          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-600">Name</span>
            <span className="font-medium text-gray-800">{task.task_name}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-600">Priority</span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
              {task.priority}
            </span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-600">Status</span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              {task.status}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Due Date</span>
            <span className="font-medium text-gray-800">{task.due_date}</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default TaskShow;