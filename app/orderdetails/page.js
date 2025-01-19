"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { waveform } from "ldrs";

export default function OrderHistoryPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      waveform.register();
    }
  }, []);

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

          const sortedOrders = data.orders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setOrders(sortedOrders || []);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      };

      fetchOrders();
    }
  }, [user]);

  if (loading || !orders) {
    return (
      <p className="min-h-screen flex justify-center items-center">
        {typeof window !== "undefined" && (
          <l-waveform size="55" stroke="3.5" speed="1" color="black"></l-waveform>
        )}
      </p>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 lg:px-20">
      <h1 className="text-3xl font-bold text-gold text-center mb-10">
        Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">You have no order history.</p>
      ) : (
        <div className="space-y-12">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white text-black rounded-lg shadow-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID:</p>
                  <p className="font-bold">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date:</p>
                  <p className="font-bold">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount:</p>
                  <p className="font-bold text-gold lg:text-center">
                    ${order.finalamounts}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 lg:text-center">Status:</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm lg:text-center ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <h2 className="text-lg font-bold mb-2">Items</h2>
                <div className="space-y-2">
                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm gap-x-4"
                    >
                      <p className="flex-1">{item.name}</p>
                      <p className="flex-1 text-center">
                        {item.quantity} x ${item.price}
                      </p>
                      <p className="flex-1 text-right">${item.totalAmount}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4">
                <h2 className="text-lg font-bold mb-2">
                  Shipping Information
                </h2>
                <p className="text-sm">
                  <strong>Address:</strong> {order.shippingDetails.address}
                </p>
                <p className="text-sm">
                  <strong>City:</strong> {order.shippingDetails.city}
                </p>
                <p className="text-sm">
                  <strong>Country:</strong> {order.shippingDetails.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
