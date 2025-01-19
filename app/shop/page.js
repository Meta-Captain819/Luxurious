"use client";
import React, { useEffect, useState } from "react";

export default function ShopPage() {
  const animate=true

  const categories = [
    {
      id: 1,
      title: "Luxurious Watches",
      description: "Timeless elegance crafted for perfection.",
      image: "/watch1.jpeg", 
      link:"/watches"
    },
    {
      id: 2,
      title: "Luxurious Jewellery",
      description: "Exquisite Jewellery to complement your style.",
      image: "/jewelry1.jpeg", 
      link:"/jewellery"
    },
    {
      id: 3,
      title: "Luxurious Clothing",
      description: "Step into luxury and comfort.",
      image: "/suit.jpeg", 
      link:"/clothing"
    },
  ];

   

  return (
    <div className="bg-black text-white min-h-screen p-8 overflow-hidden">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gold">Shop Our Categories</h1>
        <p className="mt-4 text-lg text-gray-300">
          Explore our luxurious selection of products crafted with elegance.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const animationClasses = animate
            ? index === 0
              ? "animate-slideInLeft"
              : index === 1
              ? "animate-slideInTop"
              : "animate-slideInRight" 
            : "";

          return (
            <div
              key={category.id}
              className={`relative bg-black text-white rounded-lg shadow-lg overflow-hidden flex flex-col ${animationClasses} transition-transform duration-700 ease-in-out`}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6">
                <h2 className="text-2xl font-bold text-gold mb-2">
                  {category.title}
                </h2>
                <p className="text-white text-center">{category.description}</p>
                <a href={category.link}>

                <button className="mt-4 px-6 py-2 bg-gold text-white rounded-lg shadow-lg font-bold hover:bg-yellow-600 hover:scale-105 transition duration-300">
                  Shop Now
                </button>
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
