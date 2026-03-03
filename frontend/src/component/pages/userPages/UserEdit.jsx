import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/user/find/${id}`);
        const data = res.data.data;

        setUser({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          password: "",
        });
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to fetch user");
      }
    };

    if (id) fetchData();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await api.put(`/user/update/${id}`, user);

      if (res.data.success) {
        toast.success("User Updated Successfully ✅");
        navigate("/users");
      }
    } catch (error) {
      const errData = error.response?.data;

      if (errData?.error) {
        if (Array.isArray(errData.error)) {
          const formattedErrors = {};
          errData.error.forEach((msg) => {
            formattedErrors[msg.path] = msg.message;
          });
          setErrors(formattedErrors);
        } else {
          setErrors({ general: errData.error });
        }
      } else {
        setErrors({ general: "Something went wrong" });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">

        {/* Back Button */}
        <Link
          to="/users"
          className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ⬅ Back
        </Link>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ✏ Edit User
        </h2>

        {errors.general && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {errors.general}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={changeHandler}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={changeHandler}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="number"
              name="phone"
              value={user.phone}
              onChange={changeHandler}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={changeHandler}
              placeholder="Leave blank to keep old password"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            🔄 Update User
          </button>

        </form>
      </div>
    </div>
  );
};

export default UserEdit;