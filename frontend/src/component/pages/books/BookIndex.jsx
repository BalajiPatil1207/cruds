/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const BookIndex = () => {

  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/book");
      setBooks(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch books",error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await api.delete(`/book/delete/${id}`);
      toast.success("Book deleted");
      fetchBooks();
    } catch (error) {
      toast.error("Delete failed",error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100 p-8">

      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-orange-200">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-4xl font-bold text-orange-600 tracking-wide">
            Book List
          </h2>

          <Link
            to="/book/create"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-200 active:scale-95 font-semibold"
          >
            Add Book
          </Link>

        </div>

        <div className="overflow-x-auto rounded-xl border border-orange-100">

          <table className="w-full text-left">

            <thead className="bg-orange-50 text-orange-700 uppercase text-sm tracking-wider">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Price</th>
                <th className="p-4">Year</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              {books.map((book,idx) => (
                <tr
                  key={book.book_id}
                  className="border-b border-orange-100 hover:bg-orange-50 transition duration-150"
                >

                  <td className="p-4 font-medium text-gray-700">{idx + 1}</td>

                  <td className="p-4 font-semibold text-gray-800">
                    {book.title}
                  </td>

                  <td className="p-4 text-gray-700">
                    {book.author}
                  </td>

                  <td className="p-4 font-semibold text-orange-600">
                    ₹{book.price}
                  </td>

                  <td className="p-4 text-gray-700">
                    {book.publish_year}
                  </td>

                  <td className="p-4 text-center space-x-2">

                    <Link
                      to={`/book/show/${book.book_id}`}
                      className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      View
                    </Link>

                    <Link
                      to={`/book/edit/${book.book_id}`}
                      className="px-3 py-1 text-sm rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteHandler(book.book_id)}
                      className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      Delete
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

export default BookIndex;