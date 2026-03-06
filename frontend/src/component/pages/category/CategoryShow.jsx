import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { Tag, FileText, CheckCircle, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const CategoryShow = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({});

  useEffect(() => {

    const fetchCategory = async () => {
      const res = await api.get(`/category/find/${id}`);
      setCategory(res.data.data);
    };

    fetchCategory();

  }, [id]);

  const deleteHandler = async () => {

    if (!window.confirm("Delete this category?")) return;

    try {
      await api.delete(`/category/delete/${id}`);
      toast.success("Category deleted");
      navigate("/category");
    } catch (error) {
      toast.error("Delete failed", error);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-indigo-300 px-4">

      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md border border-indigo-200">

        <div className="flex justify-between items-center mb-8">

          <Link
            to="/category"
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
          >
            <ArrowLeft size={18}/>
            Back
          </Link>

          <div className="flex gap-3">

            <Link
              to={`/category/edit/${id}`}
              className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition"
            >
              <Pencil size={18}/>
            </Link>

            <button
              onClick={deleteHandler}
              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
            >
              <Trash2 size={18}/>
            </button>

          </div>

        </div>

        <h2 className="text-4xl font-extrabold text-center mb-10 text-indigo-700 tracking-wide">
          Category Details
        </h2>

        <div className="space-y-6">

          <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <Tag className="text-indigo-600"/>
            <span className="font-semibold text-gray-800 text-lg">
              {category.category_name}
            </span>
          </div>

          <div className="flex items-start gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <FileText className="text-indigo-600 mt-1"/>
            <span className="text-gray-700">
              {category.description}
            </span>
          </div>

          <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <CheckCircle className="text-indigo-600"/>
            <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
              category.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}>
              {category.status}
            </span>
          </div>

        </div>

      </div>

    </div>

  );
};

export default CategoryShow;