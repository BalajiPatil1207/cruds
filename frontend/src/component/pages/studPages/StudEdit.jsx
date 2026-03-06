import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const StudEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/studs/stud/${id}`);
        if (res.data.success) {
          setStudent(res.data.data);
        }
      } catch (error) {
        toast.error("Failed to load student data",error);
      }
    };

    if(id) fetchStudent();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/studs/update/${id}`, student);
      if (res.data.success) {
        toast.success("Student updated successfully");
        navigate("/studs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Update failed",error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            ✏ Edit Student
          </h2>

          <Link
            to="/studs"
            className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition"
          >
            🔙 Back
          </Link>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">

          <input
            type="text"
            name="student_name"
            value={student.student_name}
            onChange={changeHandler}
            placeholder="Student Name"
            required
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="S_class"
            value={student.S_class}
            onChange={changeHandler}
            placeholder="Class"
            required
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="number"
            name="age"
            value={student.age}
            onChange={changeHandler}
            placeholder="Age"
            required
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="city"
            value={student.city}
            onChange={changeHandler}
            placeholder="City"
            required
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              💾 Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudEdit;