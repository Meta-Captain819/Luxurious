"use client"
import Image from "next/image";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session,status}= useSession()
  


  const [product, setproduct] = useState([
    { id: 1, name: "The Lone", price:23000, image: "/product-1.jpg", quantity:1 },
    { id: 2, name: "The Urban Professional", price: 8500, image: "/product-2.jpg", quantity:1 },
    { id: 3, name: "Luxurious Gold", price:30000, image: "/product-3.jpg", quantity:1 },
    { id: 4, name: "Sapphire Ring", price: 250000, image: "https://images.unsplash.com/photo-1561812350-932aed735105?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D", quantity:1 },
  ]);
  const [categories, setcategories] = useState([
    { id: 1, image: "jewelry", link:"/jewellery" },
    { id: 2, image: "Watches", link:"/watches" },
    { id: 3, image: "Clothing", link:"/clothing" },
  ]);

  const addToCart = (product) => {
    const existingData = JSON.parse(localStorage.getItem("cart")) || [];
  
    const productIndex = existingData.findIndex((item) => item.id === product.id);
  
    let updatedData;
  
    if (productIndex !== -1) {
      updatedData = existingData.map((item, index) =>
        index === productIndex
          ? {
              ...item,
              quantity: item.quantity + 1, 
            }
          : item
      );
    } else {
      updatedData = [
        ...existingData,
        {
          ...product,
          quantity: 1, 
        },
      ];
    }
  
    localStorage.setItem("cart", JSON.stringify(updatedData));
  };
  

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
        


  return (
    <main className="bg-gray-100">
      <section className="relative bg-[url('/luxury.jpeg')] bg-cover bg-center h-screen flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover <span className="text-gold">Luxury</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            The finest collection for the discerning customer.
          </p>
          <div className="space-x-4">
            <a href="/shop">
              <button className="bg-gold text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition">
                Shop Now
              </button>
            </a>
            <button className="bg-white text-gold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
            onClick={() => scrollToSection("products")}
            >
              Explore
            </button>
          </div>
        </div>
        <div className="absolute bg-black opacity-10 bg-cover bg-center h-screen"></div>
      </section>

      <section className="container mx-auto py-16 px-6 bg-black ">
        <h2 className="text-3xl font-bold text-center mb-10 text-gold">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 "id="products">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow-sm shadow-gold rounded-lg overflow-hidden  transition duration-300 transform cursor-pointer"
            >
              <div className="relative text-center ">
                <a href={category.link}>

                <img
                  src={`/${category.image}.jpeg`}
                  alt={category.image}
                  className="w-full h-48 object-cover hover:scale-110 transition transform"
                  />
                  </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="line bg-white pt-[1px]"></div>

      <section className="bg-black py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-gold">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.map((products) => (
              <div
                key={products.id}
                className="bg-gray-200 shadow-sm shadow-gold rounded-lg overflow-hidden "
              >
                <div className="image w-full h-48 overflow-hidden">

                  <img
                    src={`${products.image}`}
                    alt={`${products.name}`}
                    className="w-full h-48 object-cover hover:scale-110 transition duration-300 transform overflow-hidden cursor-pointer"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-800">{products.name}</h3>
                  <p className="text-gray-600">${products.price}</p>
                  <button
                    onClick={() => { addToCart(products) }}
                    onKeyPress={(e) => { if (e.key === "Enter") addToCart(products); }}
                    role="button"
                    className="bg-gold text-white mt-4 px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="line bg-yellow-600 pt-[1px]"></div>




    </main>
  );
}
