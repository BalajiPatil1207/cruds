import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const BooKEdit = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.get(`/book/find/${id}`);
      setBook(res.data.data);
    };

    fetchBook();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/book/update/${id}`, book);
      toast.success("Book updated");
      navigate("/book");
    } catch (error) {
      toast.error("Update failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100 px-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-orange-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-600 tracking-wide">
          Edit Book
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            name="title"
            value={book.title || ""}
            className="w-full border border-orange-200 bg-orange-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            onChange={inputHandler}
          />

          <input
            type="text"
            name="author"
            value={book.author || ""}
            className="w-full border border-orange-200 bg-orange-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            onChange={inputHandler}
          />

          <input
            type="number"
            name="price"
            value={book.price || ""}
            className="w-full border border-orange-200 bg-orange-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            onChange={inputHandler}
          />

          <input
            type="number"
            name="publish_year"
            value={book.publish_year || ""}
            className="w-full border border-orange-200 bg-orange-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            onChange={inputHandler}
          />

          <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-200 active:scale-95">
            Update Book
          </button>

          
        </form>
        <div className="mt-5"><Link
            to="/book"
            className="px-3 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
          >
            🔙 Back
          </Link></div>
      </div>
    </div>
  );
};

export default BooKEdit;
