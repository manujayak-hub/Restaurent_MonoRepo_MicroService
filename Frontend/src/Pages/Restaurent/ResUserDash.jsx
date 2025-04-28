import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantService from "../../Services/RestaurentService";
import { FaPhoneAlt, FaStar, FaUtensils, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

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
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-[#e87c21] mb-16 drop-shadow-lg">
            🍽️ Explore Amazing Restaurants
          </h2>

          {loading ? (
            <div className="text-center text-lg font-semibold text-gray-500 animate-pulse">
              Loading restaurants...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="bg-white rounded-3xl shadow-xl hover:shadow-2xl border-t-8 border-[#7fc7e0] p-4 flex flex-col transition-all duration-300 hover:scale-105"
                  >
                    {/* Restaurant Image */}
                    <div className="relative overflow-hidden rounded-2xl mb-4">
                      {restaurant.imgUrl ? (
                        <img
                          src={restaurant.imgUrl}
                          alt={restaurant.name}
                          className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded-2xl">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Restaurant Info */}
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-2xl font-bold text-[#1f2e4a] mb-3 text-center">{restaurant.name}</h3>

                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-[#7fc7e0]" /> {restaurant.address}
                          </p>
                          <p className="flex items-center gap-2">
                            <FaPhoneAlt className="text-[#7fc7e0]" /> {restaurant.contactNumber}
                          </p>
                          <p className="flex items-center gap-2">
                            <FaUtensils className="text-[#7fc7e0]" /> {restaurant.cuisine}
                          </p>
                          <p className="flex items-center gap-2">
                            <FaStar className="text-yellow-400" /> {restaurant.rating.toFixed(1)} / 5
                          </p>
                        </div>
                      </div>

                      {/* Status + View Details */}
                      <div className="mt-6 flex items-center justify-between">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            restaurant.isOpen
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {restaurant.isOpen ? "Open Now" : "Closed"}
                        </span>

                        <button
                          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                          className="ml-4 bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm"
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
      <Footer />
    </>
  );
};

export default ResUserDash;
