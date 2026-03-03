import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const StudShow = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 Fetch Student
  const fetchStudent = async () => {
    try {
      const res = await api.get(`/studs/stud/${id}`);
      if (res.data.success) {
        setStudent(res.data.data);
      } else {
        toast.error("Student not found");
        navigate("/studs");
      }
    } catch (error) {
      toast.error("Failed to load student data",error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  // 🔹 Delete Student
  const deleteHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      const res = await api.delete(`/studs/delete/${id}`);
      if (res.data.success) {
        toast.success("Student deleted successfully");
        navigate("/studs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Delete failed",error);
    }
  };

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        ⏳ Loading Student...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        Student Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          👁 Student Details
        </h2>

        {/* Student Info Card */}
        <div className="space-y-4 text-gray-700">

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Name:</span>
            <span>{student.student_name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Class:</span>
            <span>{student.S_class}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Age:</span>
            <span>{student.age}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">City:</span>
            <span>{student.city}</span>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">

          <Link
            to="/studs"
            className="px-5 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
          >
            🔙 Back
          </Link>

          <button
            onClick={deleteHandler}
            className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition shadow"
          >
            🗑 Delete
          </button>

        </div>
      </div>
    </div>
  );
};

export default StudShow;