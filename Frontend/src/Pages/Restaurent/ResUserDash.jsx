import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantService from "../../Services/RestaurentService";
import { FaPhoneAlt, FaStar, FaUtensils, FaMapMarkerAlt } from "react-icons/fa";

const ResUserDash = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestaurantService.getAll();
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch restaurants:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center text-[#e87c21] mb-12 drop-shadow">
          🍽️ Explore Amazing Restaurants
        </h2>
        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-500">
            Loading restaurants...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border-t-8 border-[#7fc7e0] p-6 transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1f2e4a] mb-1">{restaurant.name}</h3>
                      <p className="flex items-center text-sm text-gray-600 mb-2">
                        <FaMapMarkerAlt className="mr-1 text-[#7fc7e0]" /> {restaurant.address}
                      </p>
                      <p className="flex items-center text-sm text-gray-600 mb-2">
                        <FaPhoneAlt className="mr-1 text-[#7fc7e0]" /> {restaurant.contactNumber}
                      </p>
                      <p className="flex items-center text-sm text-gray-600 mb-2">
                        <FaUtensils className="mr-1 text-[#7fc7e0]" /> {restaurant.cuisine}
                      </p>
                      <p className="flex items-center text-sm text-gray-600">
                        <FaStar className="mr-1 text-yellow-400" /> {restaurant.rating.toFixed(1)} / 5
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            restaurant.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                        >
                        {restaurant.isOpen ? "Open Now" : "Closed"}
                        </span>

                        <button
                        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                        className="ml-4 bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                        >
                        View Details
                        </button>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold text-gray-500">
                No restaurants available.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResUserDash;
