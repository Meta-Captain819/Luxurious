"use client"
import React, { useState } from "react";
import jewellery from "../../data/jewellery.json";





const ProductPage = () => {

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = existingCart.find((item) => item.id === product.id);

    if (productExists) {
      productExists.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(existingCart));
    } else {
      const updatedCart = [...existingCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="text-center text-3xl font-bold text-gold mb-8">
        Our Luxurious Jewellery
      </h1>
      <section className="bg-black py-12">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {jewellery.map((product) => (
        <div
          key={product.id}
          className="group relative bg-gray-200 shadow-sm shadow-gold rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
        >
          <img
            src={`${product.image}`}
            alt={`Product ${product.name}`}
            className="w-full h-60 object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-center py-2">
            <h3 className="text-sm font-bold text-gold">{product.name}</h3>
            <p className="text-xs text-white">${product.price}</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="absolute inset-x-0 bottom-0 mb-14 mx-auto w-1/4 py-2 bg-gold text-black font-bold rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-500"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
</section>


    </div>
  );
};

export default ProductPage;
