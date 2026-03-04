import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../../services/api";
import {
  ArrowLeft,
  RefreshCw,
  IndianRupee,
  Tag,
  Calendar,
  AlignLeft,
} from "lucide-react";
import { toast } from "react-toastify";

const IncomeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const inputHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await api.get(`/income/find/${id}`);
        if (res.data.success) {
          const data = res.data.data;
          if (data.date) {
            data.date = data.date.split("T")[0];
          }
          setFormData(data);
          toast.success("Income add Successfully")
        }
      } catch (error) {
        console.error("Error fetching record", error);
      }
    };
    fetchIncome();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/income/update/${id}`, formData);
      navigate("/income");
    } catch (error) {
      alert("Update failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <Link
          to="/income"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={18} /> Back to List
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-2 bg-amber-400"></div>

          <div className="p-8 sm:p-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
              Edit Income Record
            </h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Tag size={16} className="text-amber-500" /> Source
                </label>
                <input
                  type="text"
                  name="source"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all"
                  value={formData.source || ""}
                  onChange={inputHandler}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <IndianRupee size={16} className="text-amber-500" /> Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium text-amber-700"
                  value={formData.amount || ""}
                  onChange={inputHandler}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="text-amber-500" /> Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all"
                  value={formData.date || ""}
                  onChange={inputHandler}
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <AlignLeft size={16} className="text-amber-500" /> Note
                </label>
                <textarea
                  name="note"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all resize-none"
                  rows="3"
                  value={formData.note || ""}
                  onChange={inputHandler}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} /> Update Record
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeEdit;
