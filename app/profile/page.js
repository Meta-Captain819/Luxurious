"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { waveform } from "ldrs";

const Page = () => {
  waveform.register();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    if (session) {
      signOut({ callbackUrl: "/" });
    } else {
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        if (res.ok) {
          setUser(null);
          window.location.href = "/";
        } else {
          console.error("Failed to log out");
        }
      } catch (err) {
        console.error("Error logging out:", err);
      }
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setUser(null);
      setError(null);

      if (status === "authenticated") {
        setUser(session.user);
        setLoading(false);
      }

      if (status === "unauthenticated") {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (token) {
          try {
            const res = await fetch("/api/auth/me", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (!res.ok) {
              throw new Error("Failed to fetch user data");
            }

            const data = await res.json();
            setUser(data.user);
          } catch (err) {
            console.error(err);
            setError("Error fetching user data.");
          }
        } else {
          setError("Please log in to view this page.");
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [status, session]);

  useEffect(() => {
    if (user?.id) {
      const fetchOrders = async () => {
        try {
          const response = await fetch("/api/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user.id }),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          setOrders(data.orders || []);
        } catch (error) {
          // console.error("Failed to fetch orders:", error);
        }
      };

      fetchOrders();
    }
  }, [user]);
  let membershiplevel;

  if (orders.length > 5 && orders.length < 50) {
    membershiplevel = "Bronze"
  }
  if (orders.length > 50 && orders.length < 100) {
    membershiplevel = "Gold"
  }
  if (orders.length > 100) {
    membershiplevel = "Platinum"
  }
  if (loading) {
    return (
      <p className="min-h-screen flex justify-center items-center">
        <l-waveform size="55" stroke="3.5" speed="1" color="black"></l-waveform>
      </p>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-black">
        <button
          className="bg-gold text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600"
          onClick={() => (window.location.href = "/login")}
        >
          Log In
        </button>
        <p className="text-white mt-4">{error}</p>
      </div>
    );
  }



  let deliveredOrders = 0;
  let shippedOrders = 0;
  let pendingOrders = 0;

  orders.forEach((order) => {
    if (order.orderStatus === "Delivered") deliveredOrders += 1;
    else if (order.orderStatus === "Shipped") shippedOrders += 1;
    else if (order.orderStatus === "Pending") pendingOrders += 1;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-black via-gray-800 to-black p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 mb-4">
            <img
              src={user?.image || "/user.svg"}
              alt="Profile Picture"
              className="w-full h-full object-cover rounded-full border-4 border-gold"
            />
          </div>
          <h2 className="text-2xl font-bold text-gold">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>
        {
          orders.length > 5 ? (
            <>
              <div className="bg-gradient-to-br from-gray-800 via-black to-gray-700 p-6 rounded-lg mb-10">
                <h3 className="text-xl font-bold text-gold mb-4 flex gap-3">Membership Status<p className={`${membershiplevel === "Bronze" ? "text-amber-800" : membershiplevel === "Gold" ? "text-gold" : "text-gray-200"}`}>{membershiplevel}</p></h3>
                <p className="text-gray-400 flex justify-between items-center">You are a valued member with access to exclusive benefits.

                  <a href="/vipbenefits">
                    <button className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transform transition-transform duration-300">Check details</button>
                  </a>
                </p>
              </div>
            </>
          ) : <>
            <div className="bg-gradient-to-br from-gray-800 via-black to-gray-700 p-6 rounded-lg mb-10">
              <p className="text-gray-400 flex justify-between items-center">You don't have access to Premium Membership. Check details for more info
                <a href="/vipbenefits">
                  <button className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transform transition-transform duration-300">Check details</button>
                </a>
              </p>
            </div>
          </>
        }

        <div className="overflow-hidden">
  <table className="min-w-full border-collapse text-left bg-black text-white shadow-lg rounded-lg">
    <thead>
      <tr className="bg-gold text-black uppercase tracking-wide">
        <th className="px-6 py-4 text-sm font-semibold ">Category</th>
        <th className="px-6 py-4 text-sm font-semibold ">Count</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-900 hover:scale-95 cursor-pointer transition duration-200">
        <td className="px-6 py-4  font-medium">Total Orders</td>
        <td className="px-6 py-4  text-lg font-bold text-gold">{orders.length}</td>
      </tr>
      <tr className="hover:bg-gray-900 hover:scale-95 cursor-pointer transition duration-200">
        <td className="px-6 py-4  font-medium">Delivered</td>
        <td className="px-6 py-4  text-lg font-bold text-gold">{deliveredOrders}</td>
      </tr>
      <tr className="hover:bg-gray-900 hover:scale-95 cursor-pointer transition duration-200">
        <td className="px-6 py-4 font-medium">Pending</td>
        <td className="px-6 py-4 text-lg font-bold text-gold">{pendingOrders}</td>
      </tr>
    </tbody>
  </table>
</div>




        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/changepassword">
          <button
            className="w-full hover:scale-105 transition duration-300 bg-gold text-black py-3 rounded-lg font-semibold hover:bg-yellow-600"
            >
            Change Password
          </button>
            </a>
            <a href="/paymentmethod">
          <button
            className="w-full hover:scale-105 transition duration-300 bg-gold text-black py-3 rounded-lg font-semibold hover:bg-yellow-600"
            >
            Manage Payment Methods
          </button>
            </a>
          <a href="/orderdetails">
            <button
              className="w-full hover:scale-105 transition duration-300 bg-gold text-black py-3 rounded-lg font-semibold hover:bg-yellow-600"
            >
              Order Details
            </button>
          </a>
          <button
            onClick={handleSignOut}
            className="w-full hover:scale-95 transition duration-300 bg-gold text-black py-3 rounded-lg font-semibold hover:bg-yellow-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
