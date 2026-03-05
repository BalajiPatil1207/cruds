import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";

const ContactCreate = () => {

  const [contact, setContact] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {
      await api.post("/contact/store", contact);
      toast.success("Contact created");
      navigate("/contact");
    } catch (error) {
      toast.error("Creation failed",error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Contact
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border p-2 rounded"
            onChange={inputHandler}
            value={contact.name || ''}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full border p-2 rounded"
            onChange={inputHandler}
            value={contact.phone || ''}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={inputHandler}
            value={contact.email || ''}
          />

          <textarea
            name="address"
            placeholder="Address"
            className="w-full border p-2 rounded"
            onChange={inputHandler}
            value={contact.address || ''}
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Save Contact
          </button>

        </form>

      </div>

    </div>
  );
};

export default ContactCreate;