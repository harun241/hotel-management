import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import emailjs from "emailjs-com";

const Contact = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Auto-fill email if user is logged in
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === "email" && user?.email) return; // prevent editing email if logged in

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all fields.");
      return;
    }

    const serviceID = "service_scmw52f";
    const templateID = "template_dlswg77";
    const userID = "9cWZjaOA7dRmJH9f2";

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(() => {
        setStatus("Thank you for contacting us!");
        setFormData({ name: "", email: user?.email || "", message: "" }); // keep user email if logged in
      })
      .catch(() => {
        setStatus("Failed to send message. Please try again.");
      });
  };

  return (
    <div className="bg-gray-100 py-10 px-4 md:px-20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Get In Touch</h2>
            <p className="text-gray-600">
              We'd love to hear from you. Whether you have questions about booking,
              facilities, or anything else, our team is ready to help.
            </p>
            <div>
              <p className="text-gray-800 font-medium">📍 Address:</p>
              <p className="text-gray-600">123 Luxury Ave, City Center, Dhaka 1212</p>
            </div>
            <div>
              <p className="text-gray-800 font-medium">📞 Phone:</p>
              <p className="text-gray-600">+880 1234-567890</p>
            </div>
            <div>
              <p className="text-gray-800 font-medium">📧 Email:</p>
              <p className="text-gray-600">contact@royalhaven.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    user?.email
                      ? "border-gray-400 bg-gray-100 cursor-not-allowed"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                  required
                  readOnly={!!user?.email}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>

              {status && (
                <p
                  className={`mb-4 font-medium ${
                    status.includes("Thank") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
