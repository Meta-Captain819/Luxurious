"use client"
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { waveform } from 'ldrs';

const ChangePassword = () => {
  waveform.register();
  const { data: session,status } = useSession();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setuser] = useState()
  const [error, seterror] = useState(false)
  const [error1, seterror1] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const fetchdata = async () => {
      
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
if (res.ok) {
  setloading(false)
}

        const data = await res.json();
        setuser(data.user);
      } catch (err) {
        console.error(err);
      }
    }
    fetchdata()

  }, [1000])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      seterror(true)
      seterror1("Password doesn't match")
      return;
    }

    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id, 
        oldPassword,
        newPassword,
      }),


    });
    const data = await response.json();
    if (response.ok) {
      seterror(false)
      toast.success(' Password changed successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
    if (response.status === 401) {
      seterror(true)
      seterror1("Old password is incorrect")

    } else {
      // alert(data.message);
    }

  };
  
 
  
  if (session) {
    return (
    <div className="bg-black min-h-screen text-white flex flex-col justify-center items-center">
      <h1 className=" text-4xl font-bold text-gold text-center mb-4">Cannot Change Password</h1>
      <p className="text-gray-500 text-center font-bold">You cannot change password for this account.</p>
    </div>
    );
  }

  return (
   
      
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {loading ? <p className="min-h-screen flex justify-center items-center">
        <l-waveform size="55" stroke="3.5" speed="1" color="white"></l-waveform>
      </p>:
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-yellow-500 mb-6">
          Change Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="old-password" className="block text-yellow-500 mb-2">
              Old Password
            </label>
            <input
              type="password"
              id="old-password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-yellow-500 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-yellow-500 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          {error &&
            <p className='text-red-700'>{error1}</p>
          }
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Change Password
          </button>
        </form>
      </div>
}
      <ToastContainer />
        
    </div>
    
  );
};

export default ChangePassword;
