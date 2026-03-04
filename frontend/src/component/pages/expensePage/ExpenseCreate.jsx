import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import {
  ArrowLeft,
  Save,
  IndianRupee,
  Tag,
  Calendar,
  List,
} from "lucide-react";

const ExpenseCreate = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/expense/create", formData);
      if (res.data.success) navigate("/expense");
    } catch (error) {
      alert(error.response?.data?.error || "Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link
          to="/expense"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </Link>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Add Expense
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Tag size={16} className="text-red-500" /> Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-red-500 outline-none transition-all"
                placeholder="e.g. Rent, Groceries"
                value={formData.title}
                onChange={inputHandler}
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <IndianRupee size={16} className="text-red-500" /> Amount
              </label>
              <input
                type="number"
                name="amount"
                step="0.01"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-red-500 outline-none transition-all text-red-600 font-bold"
                value={formData.amount}
                onChange={inputHandler}
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <List size={16} className="text-red-500" /> Category
              </label>
              <select
                name="category"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-red-500 outline-none transition-all"
                value={formData.category}
                onChange={inputHandler}
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar size={16} className="text-red-500" /> Date
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-red-500 outline-none transition-all"
                value={formData.date}
                onChange={inputHandler}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Save size={20} /> Save Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCreate;
