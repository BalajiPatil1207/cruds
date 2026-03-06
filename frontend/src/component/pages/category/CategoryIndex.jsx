/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { PlusCircle, Eye, Pencil, Trash2, Tag } from "lucide-react";

const CategoryIndex = () => {

  const [categories,setCategories] = useState([]);

  const fetchCategories = async()=>{
    try{
      const res = await api.get("/category");
      setCategories(res.data.data);
    }catch(error){
      toast.error("Failed to load categories",error);
    }
  };

  useEffect(()=>{
    fetchCategories();
  },[]);

  const deleteHandler = async(id)=>{

    if(!window.confirm("Delete category?")) return;

    try{

      await api.delete(`/category/delete/${id}`);
      toast.success("Deleted");
      fetchCategories();

    }catch(error){
      toast.error("Delete failed",error);
    }
  };

  return(

    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-indigo-300 p-8">

      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-indigo-200">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-extrabold flex gap-3 items-center text-indigo-700 tracking-wide">
            <Tag className="text-indigo-600"/> Categories
          </h2>

          <Link
            to="/category/create"
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-200 active:scale-95"
          >
            <PlusCircle size={18}/>
            Add Category
          </Link>

        </div>

        <div className="overflow-hidden rounded-xl border border-indigo-200">

          <table className="w-full">

            <thead className="bg-indigo-50 text-indigo-700 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="text-left">Category</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              {categories.map((category,idx)=>(

                <tr key={category.category_id} className="border-b hover:bg-indigo-50 transition">

                  <td className="p-4 font-medium text-gray-700">{idx+1}</td>

                  <td className="font-semibold text-gray-800">
                    {category.category_name}
                  </td>

                  <td className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      category.status==="Active"
                      ?"bg-green-100 text-green-700"
                      :"bg-red-100 text-red-700"
                    }`}>
                      {category.status}
                    </span>
                  </td>

                  <td className="flex justify-center gap-4 p-4">

                    <Link
                      to={`/category/show/${category.category_id}`}
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      <Eye size={18}/>
                    </Link>

                    <Link
                      to={`/category/edit/${category.category_id}`}
                      className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition"
                    >
                      <Pencil size={18}/>
                    </Link>

                    <button
                      onClick={()=>deleteHandler(category.category_id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <Trash2 size={18}/>
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
};

export default CategoryIndex;