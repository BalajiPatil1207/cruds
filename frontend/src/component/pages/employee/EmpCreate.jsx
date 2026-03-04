import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import {
  ArrowLeft,
  Save,
  IndianRupee,
  User,
  Briefcase,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";

const EmpCreate = () => {
  const [employee, setemployee] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) =>
    setemployee({ ...employee, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employee/create", employee);
      navigate("/employee");
    } catch (error) {
      toast.error("Employee not Submitted", error);
      alert("Failed to save");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link
          to="/employee"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 mb-6 font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </Link>
        <div className="bg-white rounded-2xl shadow-xl border-t-8 border-teal-500 p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Register Employee
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="text-teal-500" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={employee.name || ''}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 outline-none transition-all"
                onChange={inputHandler}
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Briefcase size={16} className="text-teal-500" /> Designation
              </label>
              <input
                type="text"
                name="designation"
                value={employee.designation || ''}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 outline-none transition-all"
                onChange={inputHandler}
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <IndianRupee size={16} className="text-teal-500" /> Salary
              </label>
              <input
                type="number"
                name="salary"
                value={employee.salary || ''}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 outline-none transition-all"
                onChange={inputHandler}
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar size={16} className="text-teal-500" /> Joining Date
              </label>
              <input
                type="date"
                name="joining_date"
                value={employee.joining_date || ''}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 outline-none transition-all"
                onChange={inputHandler}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Save size={20} /> Register Staff
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpCreate;
