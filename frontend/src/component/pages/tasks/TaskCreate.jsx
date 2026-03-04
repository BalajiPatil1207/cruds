import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const TaskCreate = () => {

  const [task, setTask] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setTask({ ...task, 
      [e.target.name]: e.target.value 
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.post("/task/store", task);
      toast.success("Task created");
      navigate("/task");
    } catch (error) {
      toast.error("Task creation failed",error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 border border-gray-200">

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-wide">
          Create Task
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">

          <input
            type="text"
            name="task_name"
            placeholder="Task Name"
            className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
            onChange={inputHandler}
            required
          />

          <select
            name="priority"
            className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            onChange={inputHandler}
          >
            <option value="">Select Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            name="status"
            className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            onChange={inputHandler}
          >
            <option value="">Select Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            name="due_date"
            className="w-full border border-gray-300 bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            onChange={inputHandler}
          />

          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-200 active:scale-95">
            Save Task
          </button>

        </form>

      </div>

    </div>
  );
};

export default TaskCreate;