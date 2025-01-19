"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { waveform } from "ldrs";

export default function ProceedToPaymentPage() {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [finalamount, setfinalamount] = useState();
  const [totalproducts, settotalproducts] = useState();
  const [userDetails, setUserDetails] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState()
  const [order, setorder] = useState(false)
  const [token, settoken] = useState(null)
  const isFormValid = address && city && country && paymentMethod;

  
  
  useEffect(() => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
        settoken(token)
      if (typeof window !== "undefined") {
        waveform.register();
      }
    }, []);
  useEffect(() => {
    const storedCartDetails = JSON.parse(localStorage.getItem("cartdetails"));
    if (storedCartDetails?.finalAmount) {
      setfinalamount(storedCartDetails.finalAmount)
    }
    if (storedCartDetails?.totalProducts) {
      settotalproducts(storedCartDetails.totalProducts)
    }


    if (storedCartDetails?.cartItems) {
      setCartItems(storedCartDetails.cartItems);
    } else {
      // console.log("No cart items found in local storage.");
    }


  }, []);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!session && token) {
        try {
          const res = await fetch(`/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Failed to fetch user details");
          const data = await res.json();
          setUserDetails(data.user);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else if (session) {
        try {
          const res = await fetch(`/api/user/${session.user.id}`);
          if (!res.ok) throw new Error("Failed to fetch user details");
          const data = await res.json();
          setUserDetails(data.user);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [session, token]);



  const placeOrder = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
    }

    if (!address.trim() || !city.trim() || !country.trim()) {
      alert("Please provide a valid address, city, and country.");
    }


    const orderDetails = {
      userid: session?.user?.id || userDetails?.id,
      items: cartItems,
      finalamounts: finalamount,
      totalProducts: totalproducts,
      address,
      city,
      country,
      paymentMethod,
    };

    if (!session && !token) {
      seterror("Login to proceed")
    }

    if (session || token) {
      try {
        setLoading(true);
        const res = await fetch(`/api/auth/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });

        const result = await res.json();
        if (res.ok) {
          setCartItems([]);
          setfinalamount()
          settotalproducts()
          setorder(true)

          localStorage.removeItem("cart");
          localStorage.removeItem("cartdetails");
        }
        if (!res.ok) throw new Error(result.error || "Failed to place order");

      } catch (error) {
        console.error("Error placing order:", error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }



  };
  if (status==="loading") {
    return (
      <p className="min-h-screen flex justify-center items-center">
        {typeof window !== "undefined" && (
          <l-waveform size="55" stroke="3.5" speed="1" color="black"></l-waveform>
        )}
      </p>
    );
  }

  return (
    <>
      {order ? <div className="bg-black min-h-screen text-white flex flex-col justify-center items-center">
        <h1 className=" text-4xl font-bold text-gold text-center mb-4">Your order has been successfully placed</h1>
        <p className="text-gray-500 text-center font-bold">ThankYou for choosing Luxurious.</p>
        </div> 
        :
        <div className="bg-black text-white min-h-screen py-8 px-4">
          <h1 className="text-3xl font-bold text-gold text-center mb-8">
            Proceed to Payment
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400">
              Your cart is empty. Please add items to your cart.
            </p>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h2 className="text-lg font-bold">Cart Items</h2>
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.name}`}
                    className="flex items-center justify-between bg-white text-black rounded-lg shadow-lg p-4 mb-2"
                  >
                    <p>{item.name} x{item.quantity}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="finaldetails bg-white text-black rounded-lg p-4 max-w-screen-lg mb-3">
                <h1 className="font-bold mb-1 text-2xl">Cart Summary:</h1>
                  <div className="totalproduct flex justify-between items-center w-full mb-1">
                    <p>Total Products:</p>
                    <p className="font-bold">{totalproducts}</p>
                  </div>
                  <div className="finalamount flex justify-between items-center w-full">
                    <p>Final Amount:</p>
                    <p className="font-bold">${finalamount}</p>
                  </div>
                </div>

              <form
                onSubmit={placeOrder}
                className="bg-black text-white min-h-screen  flex flex-col items-center py-8 px-4"
              >
                <h1 className="text-3xl font-bold text-gold mb-8">Checkout</h1>

                

                <div className="bg-white text-black rounded-lg shadow-lg p-4 mb-6 w-full max-w-screen-lg">
                  <h2 className="text-lg font-bold">Shipping Address</h2>
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2"
                    required
                  />
                </div>

                <div className="bg-white text-black rounded-lg shadow-lg p-4 mb-6 w-full max-w-screen-lg">
                  <h2 className="text-lg font-bold">Payment Method</h2>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2"
                    required
                  >
                    <option value="" disabled>
                      Select Payment Method
                    </option>
                    <option value="Cash">Cash</option>
                    
                  </select>
                </div>


                {!session && !token && (
                  <p className="text-red-500 font-bold mb-2">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full max-w-md bg-gold text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </form>

            </div>
          )}

        </div>
      }
    </>

  );
}
