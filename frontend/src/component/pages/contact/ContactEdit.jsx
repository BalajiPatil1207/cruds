import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const ContactEdit = () => {

  const [contact, setContact] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {

    const fetchContact = async () => {
      const res = await api.get(`/contact/find/${id}`);
      setContact(res.data.data);
    };

    fetchContact();

  }, [id]);

  const submitHandler = async (e) => {

    e.preventDefault();

    try {
      await api.put(`/contact/update/${id}`, contact);
      toast.success("Contact updated");
      navigate("/contact");
    } catch (error) {
      toast.error("Update failed",error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Contact
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">

          <input
            type="text"
            name="name"
            value={contact.name || ""}
            className="w-full border p-2 rounded"
            onChange={inputHandler}
          />

          <input
            type="text"
            name="phone"
            value={contact.phone || ""}
            className="w-full border p-2 rounded"
            onChange={inputHandler}
          />

          <input
            type="email"
            name="email"
            value={contact.email || ""}
            className="w-full border p-2 rounded"
            onChange={inputHandler}
          />

          <textarea
            name="address"
            value={contact.address || ""}
            className="w-full border p-2 rounded"
            onChange={inputHandler}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Update Contact
          </button>

        </form>

      </div>

    </div>
  );
};

export default ContactEdit;