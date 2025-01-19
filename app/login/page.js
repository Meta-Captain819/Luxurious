"use client";

import React, { useState, useRef,useEffect } from "react";
import Cookies from "js-cookie";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { waveform } from "ldrs";

const Login = () => {
  const ref = useRef();

  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user1, setuser1] = useState(null)
  const [error, seterror] = useState(null)
  const [error1, seterror1] = useState(null)
  const [show, setshow] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      waveform.register();
    }
  }, []);
  if (session) {
    if (typeof window !== "undefined") {
      window.location.href = "/profile";
    }
  }

  const handleSignIn = async (provider) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/profile" });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  }
  const handleshow = () => {
    setshow(!show)
    if (show === true) {
      ref.current.src = "/eye-crossed.svg"
    }
    else {
      ref.current.src = "/eye.svg"
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 404) {
        seterror("User not found")
      }
      if (res.status === 401) {
        seterror1("Invalid Credentials")
      }

      if (res.status === 200) {
        const { token, user } = data;

        Cookies.set('token', token, { path: '/' });

        window.location.href = "/profile";
      } else {
        console.log("Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false)
    }

    if (status === "loading") return (
      <p className='min-h-screen flex justify-center items-center text-black'><l-waveform
        size="55"
        stroke="3.5"
        speed="1"
        color="black"
      ></l-waveform></p>
    );
  }


  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      {isLoading ? (
        <p className='min-h-screen flex justify-center items-center text-black'>{typeof window !== "undefined" && (
          <l-waveform size="55" stroke="3.5" speed="1" color="black"></l-waveform>
        )}</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-black">Welcome</h1>
          <p className="text-center text-gray-600 mb-8">
            Choose a login method to continue
          </p>

          <div className="space-y-4">
            <button
              className="flex items-center justify-center w-full bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-700 transition"
              onClick={() => handleSignIn("google")}
            >
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>
            <button
              className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
              onClick={() => handleSignIn("facebook")}
            >
              <FaFacebookF className="mr-2" />
              Continue with Facebook
            </button>
            <button
              className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg shadow hover:bg-gray-800 transition"
              onClick={() => handleSignIn("apple")}
            >
              <FaApple className="mr-2" />
              Continue with Apple
            </button>
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">

              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="eyes">
                <button type="button" onClick={handleshow} className="absolute right-2 bottom-4"><img ref={ref} src="/eye-crossed.svg" alt="" width={20} height={20} /></button>
              </div>
            </div>
            {error && !error1 &&

              <p className="text-red-500 text-sm">{error}</p>}
            {error1 &&

              <p className="text-red-500 text-sm">{error1}</p>}
            <button
              type="submit"
              className="w-full bg-gold text-white py-3 rounded-lg shadow transition hover:bg-[#b8860b]"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-gold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
