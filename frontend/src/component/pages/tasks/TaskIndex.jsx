/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const TaskIndex = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/task");
      setTasks(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/task/delete/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Delete failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 p-8">

      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
            Task List
          </h2>

          <Link
            to="/task/create"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition duration-200"
          >
            Add Task
          </Link>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-gray-700">

            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Due Date</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              {tasks.map((task,idx) => (
                <tr
                  key={task.task_id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-4 py-3">{idx + 1}</td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    {task.task_name}
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                      {task.priority}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      {task.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">{task.due_date}</td>

                  <td className="px-4 py-3 text-center space-x-3">

                    <Link
                      to={`/task/show/${task.task_id}`}
                      className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      View
                    </Link>

                    <Link
                      to={`/task/edit/${task.task_id}`}
                      className="px-3 py-1 text-sm rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteHandler(task.task_id)}
                      className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default TaskIndex;