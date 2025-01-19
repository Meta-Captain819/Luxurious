import React from "react";

const PremiumBenefits = () => {
  const benefits = {
    Bronze: [
        "Starts from 5 Orders",
      "Access to exclusive discounts on selected items.",
      "Priority support for your queries.",
      "Early access to sales and offers.",
    ],
    Gold: [
        "Starts from 50 Orders",
      "All benefits of Bronze membership.",
      "Free shipping on all orders.",
      "Special birthday rewards and surprises.",
      "Exclusive access to premium products.",
    ],
    Platinum: [
        "Starts from 100 Orders",
      "All benefits of Gold membership.",
      "Personalized shopping assistance.",
      "Invitations to exclusive events.",
      "Access to limited-edition products.",
      "Lifetime premium support.",
    ],
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gold-500 mb-6">
          Premium Membership Benefits
        </h1>
        <p className="text-gray-300 mb-12">
          Discover the exclusive benefits of being a Premium Member. Each level offers
          luxurious perks tailored just for you.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-gradient-to-b from-amber-700 to-amber-900 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-4">Bronze</h2>
          <p className="text-center text-gray-300 mb-6">
            Perfect for new members starting their premium journey.
          </p>
          <ul className="space-y-3">
            {benefits.Bronze.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-gray-200"
              >
                <span className="text-gold-500">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-black p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-4">Gold</h2>
          <p className="text-center text-gray-800 mb-6">
            Unlock premium perks for your shopping experience.
          </p>
          <ul className="space-y-3">
            {benefits.Gold.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-gray-800"
              >
                <span className="text-black font-semibold">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-gray-300 to-white text-black p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-4">Platinum</h2>
          <p className="text-center text-gray-800 mb-6">
            Experience the ultimate in luxury and exclusivity.
          </p>
          <ul className="space-y-3">
            {benefits.Platinum.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-gray-800"
              >
                <span className="text-black font-semibold">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PremiumBenefits;
