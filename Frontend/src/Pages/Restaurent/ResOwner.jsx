import React, { useEffect, useState } from "react";
import RestaurantService from "../../Services/RestaurentService";
import MenuService from "../../Services/MenuService";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";

const ResOwner = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [menus, setMenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState("");
const [uname, setUname] = useState("");
const navigate = useNavigate()


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [updatedRestaurant, setUpdatedRestaurant] = useState({
   
    name: "",
    cuisine: "",
    contactNumber: "",
    rating: "",
    ImgUrl: "",
    address: "",
  });

  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    DishName: "",
    Price: "",
    Ingredient: "",
    VegNonveg: 1,
    ImgUrl: "",
    Rating: "0",
  });

  const [isMenuEditModalOpen, setIsMenuEditModalOpen] = useState(false);

  

  const [isAddRestaurantModalOpen, setIsAddRestaurantModalOpen] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    cuisine: "",
    contactNumber: "",
    rating: "",
    imgUrl: "",
    address: "",
  });

  const [currentMenuItem, setCurrentMenuItem] = useState(null);
const [updatedMenuItem, setUpdatedMenuItem] = useState({
  DishName: "",
  Price: "",
  Ingredient: "",
  VegNonveg: 1,
  ImgUrl: "",
  Rating: "0",
});


  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("userName");
    setUid(storedId);
    setUname(storedName);

    const fetchRestaurants = async () => {
      try {
        const res = await RestaurantService.getbyowner(storedId);
        const fetchedRestaurants = Array.isArray(res.data) ? res.data : [res.data];
        setRestaurants(fetchedRestaurants);

        const menuData = {};
        for (let rest of fetchedRestaurants) {
          const menuRes = await MenuService.getByResId(rest.id);
          menuData[rest.id] = menuRes.data;
        }
        setMenus(menuData);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch restaurants and menus:", error);
        setLoading(false);
      }
    };

    if (storedId) {
      fetchRestaurants();
    }
  }, []);

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      await RestaurantService.delete(id);
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setCurrentRestaurant(restaurant);
    setUpdatedRestaurant({
      ownername:restaurant.ownername,
      ownerid:restaurant.ownerid,
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      contactNumber: restaurant.contactNumber,
      rating: restaurant.rating,
      ImgUrl:restaurent.imgUrl,
      address: restaurant.address,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateRestaurant = async () => {
    if (currentRestaurant) {
      try {
        const updatedRes = await RestaurantService.update(currentRestaurant.id, {
          ...updatedRestaurant,
          ownerid: uid,
          ownername: uname,
        });
        
        setRestaurants((prev) =>
          prev.map((rest) =>
            rest.id === currentRestaurant.id ? { ...rest, ...updatedRestaurant, ownerid: uid, ownername: uname } : rest
          )
        );
        setIsEditModalOpen(false); 
        setCurrentRestaurant(null);
      } catch (error) {
        console.error("❌ Failed to update restaurant:", error);
      }
    }
  };
  

  const handleEditMenuItem = (item, restaurantId) => {
    setCurrentRestaurant(restaurants.find((r) => r.id === restaurantId)); // Set the current restaurant
    setCurrentMenuItem(item); // Set the current menu item
    setUpdatedMenuItem({
      Id:item.id,
      DishName: item.dishName,
      Price: item.price,
      Ingredient: item.ingredient,
      VegNonveg: item.vegNonveg,
      ImgUrl: item.imgUrl,
      Rating: item.rating,
    }); // Pre-fill the updatedMenuItem with the existing item data
    setIsMenuEditModalOpen(true); // Open the modal
  };
  
 

  const handleDeleteMenuItem = async (menuId, restaurantId) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await MenuService.delete(menuId);
        setMenus((prev) => ({
          ...prev,
          [restaurantId]: prev[restaurantId].filter((m) => m.Id !== menuId),
        }));
      } catch (error) {
        console.error("❌ Failed to delete menu item:", error);
      }
    }
  };

  const handleAddMenuItem = async () => {
    try {
      if (!currentRestaurant) {
        console.error("No restaurant selected for adding menu item.");
        return;
      }
  
      const payload = {
        DishName: newMenuItem.DishName,
        Price: newMenuItem.Price.toString(), // 👈 make it string
        Ingredient: newMenuItem.Ingredient,
        VegNonveg: Number(newMenuItem.VegNonveg), // keep it number/double
        ImgUrl: newMenuItem.ImgUrl ,
        Rating: newMenuItem.Rating.toString(), // 👈 make it string
        RestaurentId: currentRestaurant.id, // make sure this is not null
        CreatedAt: new Date().toISOString(), // ✅ correct DateTime
      };
  
      await MenuService.create(payload);
  
      // Refresh menu list
      const menuRes = await MenuService.getByResId(currentRestaurant.id);
      setMenus((prev) => ({
        ...prev,
        [currentRestaurant.id]: menuRes.data,
      }));
  
      setIsAddMenuModalOpen(false);
  
      // Reset form
      setNewMenuItem({
        DishName: "",
        Price: "",
        Ingredient: "",
        VegNonveg: 1,
        ImgUrl: "",
        Rating: "0",
      });
    } catch (error) {
      console.error("❌ Failed to add menu item:", error);
    }
  };
  
  const handleUpdateMenuItem = async () => {
    try {
      if (!currentRestaurant || !currentMenuItem) {
        console.error("Missing restaurant or menu item for update.");
        return;
      }
  
      // Construct the payload with the restaurant ID
      const payload = {
        ...updatedMenuItem,
        RestaurantId: currentRestaurant.id,  // Include restaurant ID
        Price: updatedMenuItem.Price.toString(), // Ensure Price is a string
        VegNonveg: updatedMenuItem.VegNonveg, // Ensure VegNonveg is a number
        Rating: updatedMenuItem.Rating.toString(), // Ensure Rating is a string
      };
  
      console.log("Updating menu item with payload:", payload);  // Log the payload for debugging
  
      // Send the update request with the menu item ID and the restaurant ID
      const response = await MenuService.update(currentMenuItem.Id, payload);
  
      if (response?.data) {
        console.log("Menu item updated successfully:", response.data);
      }
  
      // Refresh menu list after updating
      const menuRes = await MenuService.getByResId(currentRestaurant.id);
      setMenus((prev) => ({
        ...prev,
        [currentRestaurant.id]: menuRes.data,
      }));
  
      // Close the modal
      setIsMenuEditModalOpen(false);
  
      // Clear editing state
      setUpdatedMenuItem({
        DishName: "",
        Price: "",
        Ingredient: "",
        VegNonveg: 1,
        ImgUrl: "",
        Rating: "0",
      });
    } catch (error) {
      console.error("❌ Failed to update menu item:", error);
    }
  };
  
  
  

  const handleAddRestaurant = async () => {
    try {
      const payload = {
        ...newRestaurant,
        ownerid: uid,
        ownername: uname,
      };
      const created = await RestaurantService.create(payload);
      setRestaurants((prev) => [...prev, created.data]);
      setIsAddRestaurantModalOpen(false);
      setNewRestaurant({
        name: "",
        cuisine: "",
        contactNumber: "",
        rating: "",
        imgUrl: "",
        address: "",
      });
    } catch (error) {
      console.error("❌ Failed to add restaurant:", error);
    }
  };
  

  return (

    <>
    <header/>
    <div className="min-h-screen bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#e87c21] mb-6">🍴 Your Restaurants</h2>
        
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading...</div>
        ) : restaurants.length === 0 ? (
          <div className="text-center text-lg text-gray-500">
            No restaurants found.
            <div className="mt-4">
              <button
                onClick={() => setIsAddRestaurantModalOpen(true)}
                className="bg-[#e87c21] text-white px-4 py-2 rounded hover:bg-[#cf6b1b]"
              >
                Create Your First Restaurant
              </button>
            </div>
          </div>
        ) : (
          restaurants.map((rest) => (
            <div key={rest.id} className="mb-10 p-6 rounded-xl shadow-lg bg-white border-t-4 border-[#e87c21]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-[#1f2e4a]">{rest.name}</h3>
                <button
                onClick={() => setIsAddRestaurantModalOpen(true)}
                className="bg-[#e87c21] text-white px-4 py-2 mb-2 rounded hover:bg-[#cf6b1b]"
              >
                Create Another Restaurant
              </button>
              <button
                onClick={() =>  navigate("/user-dashboard")}
                className="bg-[#e87c21] text-white px-4 py-2 mb-2 ml-2 rounded hover:bg-[#cf6b1b]"
              >
                See Orders
              </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentRestaurant(rest);
                      setIsAddMenuModalOpen(true);
                    }}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Add Menu Item
                  </button>

                  <button
                    onClick={() => handleEditRestaurant(rest)}
                    className="bg-[#7fc7e0] text-white px-4 py-1 rounded hover:bg-[#5ea7c3]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRestaurant(rest.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {rest.imgUrl && (
                <img
                  src={rest.imgUrl}
                  alt={rest.name}
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
              )}
              <p className="text-sm text-gray-700">Cuisine: {rest.cuisine}</p>
              <p className="text-sm text-gray-700">Contact: {rest.contactNumber}</p>
              <p className="text-sm text-gray-700">Rating: {rest.rating}</p>
              <p className="text-sm text-gray-700 mb-4">Address: {rest.address}</p>

              <h4 className="text-xl font-semibold text-[#e87c21] mb-3">🍽️ Menu Items</h4>
              {menus[rest.id]?.length > 0 ? (
                menus[rest.id].map((item) => (
                  <div key={item.id} className="border rounded-xl p-4 shadow hover:shadow-md">
                    
                    {/* 🖼️ Dish Image */}
                    {item.imgUrl && (
                      <img
                        src={item.imgUrl}
                        alt={item.dishName}
                        className="w-full h-48 object-contain rounded-xl mb-4"
                      />
                    )}

                    <h5 className="font-bold text-[#1f2e4a]">{item.dishName}</h5>
                    <p className="text-sm text-gray-600">Rs. {item.price}</p>
                    <p className="text-sm text-gray-500">{item.ingredient}</p>
                    <p className="text-xs mt-1">
                      {item.vegNonveg === 1 ? (
                        <span className="text-green-500">Vegetarian</span>
                      ) : (
                        <span className="text-red-500">Non-Vegetarian</span>
                      )}
                    </p>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEditMenuItem(item, rest.id)}
                        className="bg-[#7fc7e0] text-white px-2 py-1 rounded hover:bg-[#5ea7c3] text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMenuItem(item.id, rest.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No menu items available.</p>
              )}


            </div>
          ))
        )}
      </div>

      {/* Add New Menu Item Modal */}
      {isAddMenuModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Add New Menu Item</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newMenuItem.DishName}
                onChange={(e) =>
                  setNewMenuItem((prev) => ({ ...prev, DishName: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Dish Name"
              />
              <input
                type="number"
                value={newMenuItem.Price}
                onChange={(e) =>
                  setNewMenuItem((prev) => ({ ...prev, Price: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Price"
              />
              <input
                type="text"
                value={newMenuItem.Ingredient}
                onChange={(e) =>
                  setNewMenuItem((prev) => ({ ...prev, Ingredient: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Ingredient"
              />
              <select
                value={newMenuItem.VegNonveg}
                onChange={(e) =>
                  setNewMenuItem((prev) => ({ ...prev, VegNonveg: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="1">Vegetarian</option>
                <option value="0">Non-Vegetarian</option>
              </select>
              <input
                type="text"
                value={newMenuItem.ImgUrl}
                onChange={(e) =>
                  setNewMenuItem((prev) => ({ ...prev, ImgUrl: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Image URL"
              />
              <input
                type="number"
                value={newMenuItem.Rating}
                onChange={(e) =>
                  setNewMenuItem((prev) => ({ ...prev, Rating: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Rating (1-5)"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsAddMenuModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMenuItem}
                className="bg-[#e87c21] text-white px-4 py-2 rounded-md"
              >
                Add Menu Item
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Edit Menu Item Modal */}
        {isMenuEditModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-2xl font-bold mb-4">Edit Menu Item</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={updatedMenuItem.DishName}
                  onChange={(e) =>
                    setUpdatedMenuItem((prev) => ({ ...prev, DishName: e.target.value }))
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Dish Name"
                />
                <input
                  type="number"
                  value={updatedMenuItem.Price}
                  onChange={(e) =>
                    setUpdatedMenuItem((prev) => ({ ...prev, Price: e.target.value }))
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Price"
                />
                <input
                  type="text"
                  value={updatedMenuItem.Ingredient}
                  onChange={(e) =>
                    setUpdatedMenuItem((prev) => ({ ...prev, Ingredient: e.target.value }))
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Ingredient"
                />
                <select
                  value={updatedMenuItem.VegNonveg}
                  onChange={(e) =>
                    setUpdatedMenuItem((prev) => ({ ...prev, VegNonveg: Number(e.target.value) }))
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value={1}>Vegetarian</option>
                  <option value={0}>Non-Vegetarian</option>
                </select>
                <input
                  type="text"
                  value={updatedMenuItem.ImgUrl}
                  onChange={(e) =>
                    setUpdatedMenuItem((prev) => ({ ...prev, ImgUrl: e.target.value }))
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Image URL"
                />
                <input
                  type="number"
                  value={updatedMenuItem.Rating}
                  onChange={(e) =>
                    setUpdatedMenuItem((prev) => ({ ...prev, Rating: e.target.value }))
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Rating (1-5)"
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setIsMenuEditModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateMenuItem}
                  className="bg-[#7fc7e0] text-white px-4 py-2 rounded-md"
                >
                  Update Menu Item
                </button>
              </div>
            </div>
          </div>
        )}



      {/* Edit Restaurant Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Edit Restaurant</h3>
            <div className="space-y-4">
              {/* Input fields */}
              <input
                type="text"
                value={updatedRestaurant.name}
                onChange={(e) =>
                  setUpdatedRestaurant((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Restaurant Name"
              />
              <input
                type="text"
                value={updatedRestaurant.cuisine}
                onChange={(e) =>
                  setUpdatedRestaurant((prev) => ({ ...prev, cuisine: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Cuisine"
              />
              <input
                type="text"
                value={updatedRestaurant.contactNumber}
                onChange={(e) =>
                  setUpdatedRestaurant((prev) => ({ ...prev, contactNumber: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Contact Number"
              />
              <input
                type="text"
                value={updatedRestaurant.rating}
                onChange={(e) =>
                  setUpdatedRestaurant((prev) => ({ ...prev, rating: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Rating"
              />
              <input
                type="text"
                value={updatedRestaurant.address}
                onChange={(e) =>
                  setUpdatedRestaurant((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Address"
              />
               <input
                type="text"
                value={updatedRestaurant.ImgUrl}
                onChange={(e) =>
                  setUpdatedRestaurant((prev) => ({ ...prev, imgUrl: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Image URL"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRestaurant}
                className="bg-[#7fc7e0] text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Restaurant Modal */}
      {isAddRestaurantModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Create New Restaurant</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newRestaurant.name}
                onChange={(e) =>
                  setNewRestaurant((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Restaurant Name"
              />
              <input
                type="text"
                value={newRestaurant.cuisine}
                onChange={(e) =>
                  setNewRestaurant((prev) => ({ ...prev, cuisine: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Cuisine"
              />
              <input
                type="text"
                value={newRestaurant.contactNumber}
                onChange={(e) =>
                  setNewRestaurant((prev) => ({ ...prev, contactNumber: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Contact Number"
              />
              <input
                type="text"
                value={newRestaurant.rating}
                onChange={(e) =>
                  setNewRestaurant((prev) => ({ ...prev, rating: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Rating"
              />
              <input
                type="text"
                value={newRestaurant.address}
                onChange={(e) =>
                  setNewRestaurant((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Address"
              />
                <input
                type="text"
                value={newRestaurant.imgUrl}
                onChange={(e) =>
                  setNewRestaurant((prev) => ({ ...prev, imgUrl: e.target.value }))
                }
                className="w-full p-2 border rounded-md"
                placeholder="Image URL"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsAddRestaurantModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRestaurant}
                className="bg-[#e87c21] text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ResOwner;
