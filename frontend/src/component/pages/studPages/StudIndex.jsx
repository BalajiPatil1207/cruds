import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const StudIndex = () => {
  const [student, setStudent] = useState([]);

  const studFunction = async () => {
    try {
      const res = await api.get("/studs");
      setStudent(res.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    studFunction();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await api.delete(`/studs/delete/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        studFunction();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            🎓 Student Management
          </h1>

          <Link
            to="studcreate"
            className="mt-4 md:mt-0 bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition duration-300"
          >
            ➕ Add Student
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Class</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">City</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {student.length > 0 ? (
                student.map((stud, idx) => (
                  <tr
                    key={stud.student_id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {stud.student_name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{stud.S_class}</td>
                    <td className="py-3 px-4 text-gray-600">{stud.age}</td>
                    <td className="py-3 px-4 text-gray-600">{stud.city}</td>

                    <td className="py-3 px-4 text-center space-x-2">
                      <Link
                        to={`studedit/${stud.student_id}`}
                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition text-sm"
                      >
                        ✏ Edit
                      </Link>

                      <Link
                        to={`studshow/${stud.student_id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-sm"
                      >
                        👁 View
                      </Link>

                      <button
                        onClick={() => deleteHandler(stud.student_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No Students Found
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

export default StudIndex;
