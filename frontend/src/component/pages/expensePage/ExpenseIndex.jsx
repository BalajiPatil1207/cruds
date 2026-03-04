import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { Plus, Edit, Trash2, IndianRupee,} from "lucide-react";

const ExpenseIndex = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expense");
      if (response.data.success) setExpenses(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExpense = async (id) => {
    if (window.confirm("Delete this expense?")) {
      try {
        await api.delete(`/expense/delete/${id}`);
        fetchExpenses();
      } catch (error) {
        alert("Error deleting", error);
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Expense Tracker</h2>
          <Link
            to="/expense/create"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-red-200 transition-all active:scale-95"
          >
            <Plus size={20} /> Add Expense
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map((item) => (
                <tr
                  key={item.expense_id}
                  className="hover:bg-gray-50/80 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-red-600 font-bold">
                    <div className="flex items-center">
                      <IndianRupee size={14} />
                      {item.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex border rounded-lg">
                      <Link
                        to={`/expense/edit/${item.expense_id}`}
                        className="p-2 text-amber-500 hover:bg-amber-50 border-r"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => deleteExpense(item.expense_id)}
                        className="p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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

export default ExpenseIndex;
