"use client";
import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  subsets: ['latin'], 
  weight: '400', 
  style: 'normal', 
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([])
  const { data: session, status } = useSession();
  const [login, setlogin] = useState(false)

useEffect(() => {
  const fetchlogin= ()=>{

    
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    if(token){
      setlogin(true)
      
    } 
    
  
    
  }
  fetchlogin();
}, [])

useEffect(() => {
  const fetchCartItems = () => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(storedItems);
  };

  fetchCartItems();

  const handleStorageChange = () => {
    fetchCartItems(); 
  };

  window.addEventListener("storage", handleStorageChange);

  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);
    if (key === "cart") {
      handleStorageChange(); 
    }
  };

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    localStorage.setItem = originalSetItem; 
  };
}, []);

  

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between py-4">
        <div className="text-4xl text-gray-800">
          <a href="/">
          <span style={{ fontFamily: greatVibes.style.fontFamily }} className="text-gold">Luxurious</span>
          </a>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-700 hover:text-gold transition font-bold">Home</a>
          <a href="/shop" className="text-gray-700 hover:text-gold transition font-bold">Shop</a>
          <a href="/about" className="text-gray-700 hover:text-gold transition font-bold">About</a>
          <a href="/contact" className="text-gray-700 hover:text-gold transition font-bold">Contact</a>
         
        </nav>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <a href="/cart">
            <FaShoppingCart className="text-gray-700 text-lg cursor-pointer hover:text-gold transition" />
            <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full px-2">
              {items.length >0? items.length:"0"}
            </span>
            </a>
          </div>
          <a href={session || login? "/profile":"/login"}>
          <FaUser className="text-gray-700 text-lg cursor-pointer hover:text-gold transition"  />
          </a>
          <button
            className="md:hidden text-gray-700 text-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            
            <FaBars />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-white md:hidden shadow-md">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a href="#" className="text-gray-700 hover:text-gold transition">Home</a>
            <a href="#" className="text-gray-700 hover:text-gold transition">Shop</a>
            <a href="#" className="text-gray-700 hover:text-gold transition">About</a>
            <a href="#" className="text-gray-700 hover:text-gold transition">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
