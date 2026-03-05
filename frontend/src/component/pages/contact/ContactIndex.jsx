/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const ContactIndex = () => {

  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contact");
      setContacts(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch contacts",error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteHandler = async (id) => {

    if (!window.confirm("Delete this contact?")) return;

    try {
      await api.delete(`/contact/delete/${id}`);
      toast.success("Contact deleted");
      fetchContacts();
    } catch (error) {
      toast.error("Delete failed",error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">

        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold">Contact List</h2>

          <Link
            to="/contact/create"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Add Contact
          </Link>
        </div>

        <table className="w-full border text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Address</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {contacts.map((contact, idx) => (

              <tr key={contact.contact_id} className="border-b">

                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{contact.name}</td>
                <td className="p-3">{contact.phone}</td>
                <td className="p-3">{contact.email}</td>
                <td className="p-3">{contact.address}</td>

                <td className="p-3 text-center space-x-2">

                  <Link
                    to={`/contact/show/${contact.contact_id}`}
                    className="text-blue-500"
                  >
                    View
                  </Link>

                  <Link
                    to={`/contact/edit/${contact.contact_id}`}
                    className="text-green-500"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteHandler(contact.contact_id)}
                    className="text-red-500"
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
  );
};

export default ContactIndex;