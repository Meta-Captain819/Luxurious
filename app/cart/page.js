"use client";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const initializeCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const processedCart = storedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        totalAmount: (item.price * item.quantity).toFixed(2),
      }));
      localStorage.setItem("cart", JSON.stringify(processedCart));
      setCartItems(processedCart);
    };

    initializeCart();
  }, []);

  useEffect(() => {
    const totalAmount = cartItems.reduce((acc, item) => acc + parseFloat(item.totalAmount), 0);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setFinalAmount(totalAmount);
    setTotalProducts(totalQuantity);
  }, [cartItems]);

  

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
            totalAmount: (item.price * (item.quantity + 1)).toFixed(2),
          }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
            totalAmount: (item.price * (item.quantity - 1)).toFixed(2),
          }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    const cartDetails = {
      cartItems,
      finalAmount: finalAmount.toFixed(2),
      totalProducts,
    };

    localStorage.setItem("cartdetails", JSON.stringify(cartDetails));
    window.location.href = "/checkout";
  };

  return (
    <div className="bg-black text-white min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-gold text-center mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white text-black rounded-lg shadow-lg p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  <p className="text-gray-500">Total: ${item.totalAmount}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-300 text-black px-2 py-1 rounded-lg"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-300 text-black px-2 py-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white text-black rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold">Cart Summary</h2>
            <div className="flex justify-between">
              <p>Total Products:</p>
              <p>{totalProducts}</p>
            </div>
            <div className="flex justify-between">
              <p>Final Amount:</p>
              <p>${finalAmount.toFixed(2)}</p>
            </div>
            <button
              className="mt-4 w-full bg-gold text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
