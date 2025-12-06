import React from "react";

const sampleProducts = [
  {
    id: 1,
    name: "Pink Hoodie",
    price: 899,
    img: "https://via.placeholder.com/300x200?text=Hoodie",
  },
  {
    id: 2,
    name: "White Sneakers",
    price: 1499,
    img: "https://via.placeholder.com/300x200?text=Sneakers",
  },
  {
    id: 3,
    name: "Classic Backpack",
    price: 799,
    img: "https://via.placeholder.com/300x200?text=Backpack",
  },
];

const Products = () => {
  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">Products</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sampleProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600 mb-3">₱{item.price}</p>

              <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
