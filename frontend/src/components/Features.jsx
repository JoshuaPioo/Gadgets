import React from "react";
import { FaShippingFast, FaLock, FaHeadset, FaTags } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaShippingFast size={32} />,
      title: "Fast Delivery",
      desc: "Get your gadgets delivered within 1-3 days nationwide.",
    },
    {
      icon: <FaLock size={32} />,
      title: "Secure Payments",
      desc: "Your transactions are protected with advanced encryption.",
    },
    {
      icon: <FaHeadset size={32} />,
      title: "24/7 Support",
      desc: "Our support team is always ready to assist you anytime.",
    },
    {
      icon: <FaTags size={32} />,
      title: "Best Deals",
      desc: "Enjoy exclusive discounts and promo bundles every week.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          Why Shop With Us?
        </h2>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-pink-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center border border-pink-200"
            >
              <div className="text-pink-600 flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 classname="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
