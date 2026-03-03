import React, { useState } from "react";
import api from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";

const UserCreate = () => {
  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});

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
      const res = await api.post("/user/store", user);

      if (res.data.success) {
        setUser(initialState);
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          👤 Create New User
        </h2>

        {errors.general && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {errors.general}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-5 mb-5">
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
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition"
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
              placeholder="Enter email address"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition"
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
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={changeHandler}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            🚀 Create User
          </button>
        </form>
        <div className="flex justify-between">
          <Link to={"/users"} className="bg-blue-500 text-white px-3 py-2  rounded-lg hover:bg-red-600 transition text-sm">
           Back
        </Link>
        <Link to={"/users"} className="bg-red-500 text-white px-3 py-2  rounded-lg hover:bg-red-600 transition text-sm">
          Cancel
        </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
