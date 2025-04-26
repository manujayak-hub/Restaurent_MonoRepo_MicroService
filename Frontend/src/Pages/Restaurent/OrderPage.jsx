import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantService from "../../Services/RestaurentService";
import MenuService from "../../Services/MenuService";
import { FaPhoneAlt, FaStar, FaUtensils, FaMapMarkerAlt, FaShoppingCart, FaLeaf, FaHamburger } from "react-icons/fa";

const OrderPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await RestaurantService.getById(id);
        setRestaurant(resData.data);

        const menuData = await MenuService.getByResId(id);
        setMenuItems(menuData.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = (item) => {
    alert(`🛒 Added "${item.DishName}" to cart!`);
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold text-gray-500">
        Loading restaurant & menu...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
        {/* Restaurant Info */}
        <div className="bg-white rounded-3xl shadow-lg border-t-8 border-[#e87c21] p-8 mb-12">
          <h1 className="text-4xl font-extrabold text-[#e87c21] mb-4">{restaurant.name}</h1>
          <p className="flex items-center text-sm text-gray-700 mb-2">
            <FaMapMarkerAlt className="mr-2 text-[#7fc7e0]" /> {restaurant.address}
          </p>
          <p className="flex items-center text-sm text-gray-700 mb-2">
            <FaPhoneAlt className="mr-2 text-[#7fc7e0]" /> {restaurant.contactNumber}
          </p>
          <p className="flex items-center text-sm text-gray-700 mb-2">
            <FaUtensils className="mr-2 text-[#7fc7e0]" /> {restaurant.cuisine}
          </p>
          <p className="flex items-center text-sm text-gray-700">
            <FaStar className="mr-2 text-yellow-400" /> {restaurant.rating.toFixed(1)} / 5
          </p>
        </div>

        {/* Menu Items */}
        <h2 className="text-3xl font-bold text-center text-[#e87c21] mb-8 drop-shadow">
          🧾 Menu Items
        </h2>

        {menuItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            {menuItems.map((item) => (
              <div
                key={item.Id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border-t-8 border-[#7fc7e0] p-6 transition-transform duration-300 hover:scale-105"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <img
                      src={item.ImgUrl}
                      alt={item.DishName}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-bold text-[#1f2e4a] mb-2">{item.DishName}</h3>
                    <p className="text-sm text-gray-600 mb-2">Ingredients: {item.Ingredient}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      <FaStar className="mr-1 text-yellow-400" /> {item.Rating} ⭐
                    </p>
                    <p className="text-lg font-semibold text-gray-800 mb-2">Rs. {item.Price}</p>

                    {/* Display Veg or Non-Veg */}
                    <p className="flex items-center text-sm text-gray-700">
                      {item.VegNonveg === 1 ? (
                        <FaLeaf className="mr-1 text-green-500" /> // Veg
                      ) : (
                        <FaHamburger className="mr-1 text-red-500" /> // Non-Veg
                      )}
                      {item.VegNonveg === 1 ? "Vegetarian" : "Non-Vegetarian"}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-lg font-semibold text-gray-500">
            No food items found.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
