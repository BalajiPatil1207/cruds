import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { Tag, FileText, Save, ArrowLeft } from "lucide-react";

const CategoryEdit = () => {
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await api.get(`/category/find/${id}`);
      setCategory(res.data.data);
    };

    fetchCategory();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/category/update/${id}`, category);
      toast.success("Category updated");
      navigate("/category");
    } catch (error) {
      toast.error("Update failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-indigo-300 px-4">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-indigo-200">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-indigo-700 tracking-wide">
          Edit Category
        </h2>

        <div className="mb-6">
          <Link
            to={"/category"}
            className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-200 transition duration-200 shadow-sm"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex items-center gap-3 border border-indigo-200 bg-indigo-50 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">
            <Tag className="text-indigo-600" size={20} />

            <input
              name="category_name"
              value={category.category_name || ""}
              className="w-full bg-transparent outline-none text-gray-700"
              onChange={inputHandler}
            />
          </div>

          <div className="flex items-start gap-3 border border-indigo-200 bg-indigo-50 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">
            <FileText className="text-indigo-600 mt-1" size={20} />

            <textarea
              name="description"
              value={category.description || ""}
              className="w-full bg-transparent outline-none text-gray-700 resize-none"
              rows="3"
              onChange={inputHandler}
            />
          </div>

          <select
            name="status"
            value={category.status || ""}
            className="w-full border border-indigo-200 bg-indigo-50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-700"
            onChange={inputHandler}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-200 active:scale-95">
            <Save size={20} />
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryEdit;
