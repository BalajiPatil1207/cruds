/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const UserIndex = () => {
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/user");
      setUser(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await api.delete(`/user/delete/${id}`);

      if (res.data.success) {
        toast.success(res.data.message);
        fetchData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-6">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            👨‍💼 User Management
          </h1>

          <Link
            to="create"
            className="mt-4 md:mt-0 bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition duration-300"
          >
            ➕ Add User
          </Link>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">

          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">

            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">

              {user.length > 0 ? (
                user.map((u, idx) => (
                  <tr
                    key={u.user_ID}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {u.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {u.email}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {u.phone}
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">

                      <Link
                        to={`edit/${u.user_ID}`}
                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition text-sm"
                      >
                        ✏ Edit
                      </Link>

                      <Link
                        to={`show/${u.user_ID}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-sm"
                      >
                        👁 View
                      </Link>

                      <button
                        onClick={() => deleteHandler(u.user_ID)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
                      >
                        🗑 Delete
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500"
                  >
                    No Users Found
                  </td>
                </tr>
              )}

            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default UserIndex;