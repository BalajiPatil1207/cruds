import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    quantity: "",
    description: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/find/${id}`);
        if (res.data.success) {
          setProduct(res.data.data);
        }
      } catch {
        toast.error("Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/product/update/${id}`, product);
      if (res.data.success) {
        toast.success("Product updated");
        navigate("/product");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">✏ Edit Product</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={changeHandler}
            required
            className="w-full border px-4 py-2 rounded-xl"
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={changeHandler}
            required
            className="w-full border px-4 py-2 rounded-xl"
          />

          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={changeHandler}
            required
            className="w-full border px-4 py-2 rounded-xl"
          />

          <textarea
            name="description"
            value={product.description}
            onChange={changeHandler}
            required
            className="w-full border px-4 py-2 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;