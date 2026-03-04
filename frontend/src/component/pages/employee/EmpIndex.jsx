/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { Plus, Edit, Trash2, User } from "lucide-react";

const EmpIndex = () => {
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employee");
      if (res.data.success) setEmployees(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmp = async (id) => {
    if (window.confirm("Remove this employee?")) {
      await api.delete(`/employee/delete/${id}`);
      fetchEmployees();
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Employee Management
          </h2>
          <Link
            to="/employee/create"
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <Plus size={20} /> Add Employee
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Designation
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                  Salary
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => (
                <tr
                  key={emp.employee_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3 font-semibold text-gray-900">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    {emp.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{emp.designation}</td>
                  <td className="px-6 py-4 font-bold text-teal-600">
                    ₹{emp.salary}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex border rounded-lg overflow-hidden">
                      <Link
                        to={`/employee/edit/${emp.employee_id}`}
                        className="p-2 text-amber-500 hover:bg-amber-50 border-r"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => deleteEmp(emp.employee_id)}
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

export default EmpIndex;
