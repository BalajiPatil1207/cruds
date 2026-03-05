import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

const ContactShow = () => {

  const { id } = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {

    const fetchContact = async () => {
      const res = await api.get(`/contact/find/${id}`);
      setContact(res.data.data);
    };

    fetchContact();

  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 px-4">

      <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-blue-200">

        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600 tracking-wide">
          Contact Details
        </h2>

        <div className="space-y-5 text-gray-700">

          <div className="flex justify-between items-center border-b border-blue-100 pb-3">
            <span className="font-semibold text-gray-600">Name</span>
            <span className="font-medium text-gray-800">{contact.name}</span>
          </div>

          <div className="flex justify-between items-center border-b border-blue-100 pb-3">
            <span className="font-semibold text-gray-600">Phone</span>
            <span className="font-medium text-gray-800">{contact.phone}</span>
          </div>

          <div className="flex justify-between items-center border-b border-blue-100 pb-3">
            <span className="font-semibold text-gray-600">Email</span>
            <span className="font-medium text-blue-600">{contact.email}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Address</span>
            <span className="font-medium text-gray-800">{contact.address}</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactShow;