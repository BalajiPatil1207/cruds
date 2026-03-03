import React from "react";
import { useState } from "react";
import api from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";

function StudCreate() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});

  const changeHandler = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/studs/store",student);    
      if (res.data.success) {
        setStudent(res.data.data);
        navigate("/studs");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
    
    <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8">
      <Link
            to="/studs"
            className="mt-4 md:mt-0 bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition duration-300"
          >
            Back
          </Link>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🎓 Add New Student
      </h2>

      <form onSubmit={submitHandler} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="student_name"
            value={student.student_name || ""}
            onChange={changeHandler}
            placeholder="Enter student name"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Class */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Class
          </label>
          <input
            type="text"
            name="S_class"
            value={student.S_class || ""}
            onChange={changeHandler}
            placeholder="Enter class"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={student.age || ""}
            onChange={changeHandler}
            placeholder="Enter age"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={student.city || ""}
            onChange={changeHandler}
            placeholder="Enter city"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-4">

          <button
            type="button"
            onClick={() => navigate("/studs")}
            className="px-5 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            ➕ Submit
          </button>

        </div>

      </form>
    </div>
  </div>
);
}

export default StudCreate;
