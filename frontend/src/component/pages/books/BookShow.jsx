import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../services/api";

const BookShow = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.get(`/book/find/${id}`);
      setBook(res.data.data);
    };

    fetchBook();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100 px-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-orange-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-600 tracking-wide">
          Book Details
        </h2>

        <Link
          to="/book"
          className="px-3 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
        >
          🔙 Back
        </Link>
        <div className="space-y-5 text-gray-700 mt-5">
          <div className="flex justify-between items-center border-b border-orange-100 pb-3">
            <span className="font-semibold text-gray-600">Title</span>
            <span className="font-medium text-gray-800">{book.title}</span>
          </div>

          <div className="flex justify-between items-center border-b border-orange-100 pb-3">
            <span className="font-semibold text-gray-600">Author</span>
            <span className="font-medium text-gray-800">{book.author}</span>
          </div>

          <div className="flex justify-between items-center border-b border-orange-100 pb-3">
            <span className="font-semibold text-gray-600">Price</span>
            <span className="font-medium text-orange-600">₹{book.price}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Publish Year</span>
            <span className="font-medium text-gray-800">
              {book.publish_year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShow;
