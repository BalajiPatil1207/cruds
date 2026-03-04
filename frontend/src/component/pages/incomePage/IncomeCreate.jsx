import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import {
  ArrowLeft,
  Save,
  IndianRupee,
  Tag,
  Calendar,
  AlignLeft,
} from "lucide-react";

const IncomeCreate = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/income/create", formData);
      if (res.data.success) {
        navigate("/income");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to create record");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <Link
          to="/income"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={18} /> Back to List
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="p-8 sm:p-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
              Add New Income
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Tag size={16} className="text-blue-500" /> Source
                </label>
                <input
                  type="text"
                  name="source"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                  placeholder="e.g. Salary, Freelance"
                  value={formData.source}
                  onChange={inputHandler}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <IndianRupee size={16} className="text-blue-500" /> Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium text-blue-600"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={inputHandler}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="text-blue-500" /> Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  value={formData.date}
                  onChange={inputHandler}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <AlignLeft size={16} className="text-blue-500" /> Note
                  (Optional)
                </label>
                <textarea
                  name="note"
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                  placeholder="Add details..."
                  value={formData.note}
                  onChange={inputHandler}>
                </textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Save size={20} /> Save Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeCreate;
