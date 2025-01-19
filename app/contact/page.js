"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Contact() {
  const { data: session, status } = useSession()
  const [login, setlogin] = useState(false)
  const [error, seterror] = useState()
  const [confirm, setconfirm] = useState()
  const [token, settoken] = useState(null)
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
      settoken(token)
    if (session) {
      setlogin(true);
    }
    if (token) {
      setlogin(true)
    }
    if (!session && !token) {
      seterror("Login to send message")
    }
  }, [session, status]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const sendmessage = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (res.ok) {
        setformdata({ name: "", email: "", message: "" });
        setconfirm("Message sent!")
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.log("There was an error sending the message", error);
    }
  };

  return (
    <div className="bg-white text-darkGray">
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8">
        <div className="flex-1 bg-lightGray rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gold mb-6">Send Us a Message</h2>
          <form onSubmit={sendmessage} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formdata.name}
                onChange={handlechange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formdata.email}
                onChange={handlechange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                value={formdata.message}
                onChange={handlechange}
                required
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              ></textarea>
            </div>
            {!session && !token && <p className="text-red-500 text-sm">{error}</p>}

            <p className="text-green-500 text-base">{confirm}</p>
            <button
              type="submit"
              disabled={!login}
              className="w-full bg-gold text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"

            >
              Send Message
            </button>
          </form>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gold mb-6">Contact Information</h2>
          <p className="text-lg leading-relaxed mb-6">
            Whether you have questions, feedback, or just want to say hello, we
            are here to help!
          </p>
          <div className="space-y-4">
            <p>
              <strong>Address:</strong> Ali Abad Street #1, Alamdar Road Quetta, Pakistan
            </p>
            <p>
              <strong>Phone:</strong> +92 348 8062645
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@goldwhite.com" className="text-gold">
                muzammilmehdi52@gmail.com
              </a>
            </p>
            <p>
              <strong>Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </section>
      <header className="bg-gold text-white text-center py-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg">
          We'd love to hear from you! Get in touch with us today.
        </p>
      </header>
    </div>
  );
}
