import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

const EmpEdit = () => {
  const [employee, setEmployee] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    setEmployee({ 
      ...employee, 
      [e.target.name]: e.target.value 
    });
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employee/find/${id}`);
        setEmployee(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch employee", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/employee/update/${id}`, employee);
      toast.success("Employee updated successfully");
      navigate("/employee");
    } catch (error) {
      toast.error("Employee update failed", error);
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
            Edit Employee
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="text-teal-500" /> Full Name
              </label>

              <input
                type="text"
                name="name"
                value={employee.name || ""}
                onChange={inputHandler}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 outline-none transition-all"
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
                value={employee.designation || ""}
                onChange={inputHandler}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 outline-none transition-all"
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
                value={employee.salary || ""}
                onChange={inputHandler}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 outline-none transition-all"
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
                value={employee.joining_date || ""}
                onChange={inputHandler}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Save size={20} /> Update Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
