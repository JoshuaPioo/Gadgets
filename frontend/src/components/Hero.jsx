import React from "react";

const Hero = () => {
  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-pink-100 to-pink-200 flex items-center px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Text Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-700 leading-tight">
            Upgrade Your <span className="text-pink-500">Tech Lifestyle</span>
          </h1>

          <p className="text-gray-700 mt-4 text-lg">
            Shop the best gadgets at the best deals. Fast, easy and trusted online shopping.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="/products"
              className="px-6 py-3 bg-pink-500 text-white rounded-xl font-semibold shadow hover:bg-pink-600 transition"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="Gadget.jpg"
            alt="Gadget"
            className="w-72 md:w-[360px] drop-shadow-xl rounded-2xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
