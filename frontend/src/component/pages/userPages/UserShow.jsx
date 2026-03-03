import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";

const UserShow = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/user/find/${id}`);
        if (res.data.success) {
          setUser(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to fetch user");
      }
    };

    if (id) fetchData();
  }, [id]);

  const deleteHandler = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await api.delete(`/user/delete/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/users");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 relative">

        {/* Back Button */}
        <Link
          to="/users"
          className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ⬅ Back
        </Link>

        {/* Avatar */}
        <div className="flex flex-col items-center mt-6">
          <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-4 text-gray-700">

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">📧 Email</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">📱 Phone</span>
            <span>{user.phone}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">🆔 User ID</span>
            <span>{user.user_ID}</span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">

          <Link
            to={`/users/edit/${user.user_ID}`}
            className="bg-yellow-400 text-white px-5 py-2 rounded-xl shadow hover:bg-yellow-500 transition duration-300"
          >
            ✏ Edit
          </Link>

          <button
            onClick={() => deleteHandler(user.user_ID)}
            className="bg-red-500 text-white px-5 py-2 rounded-xl shadow hover:bg-red-600 transition duration-300"
          >
            🗑 Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default UserShow;