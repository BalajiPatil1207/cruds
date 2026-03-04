import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const ProductIndex = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/product");
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch products",error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await api.delete(`/product/delete/${id}`);
      if (res.data.success) {
        toast.success("Product deleted");
        setProducts(prev => prev.filter(p => p.product_id !== id));
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🛒 Products</h1>
          <Link
            to="/product/create"
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            ➕ Add Product
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-xl overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Qty</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((p, i) => (
                <tr key={p.product_id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4">{p.product_name}</td>
                  <td className="py-3 px-4">₹ {p.price}</td>
                  <td className="py-3 px-4">{p.quantity}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Link
                      to={`/product/edit/${p.product_id}`}
                      className="bg-yellow-400 px-3 py-1 rounded text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(p.product_id)}
                      className="bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    No Products Found
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

export default ProductIndex;