import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import CartService from "../../Services/CartService";
import { FaLeaf, FaHamburger, FaStar } from "react-icons/fa";

const AddToCart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { item } = location.state || {};  // fallback in case of direct access

  console.log(item); 

 
console.log("stateeeeeeeeeeeeeeeeeeeee", location.state); // Log the item ID to the console



  
//

 

  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState(localStorage.getItem('cartId') || '');

  const handleAddToCart = async () => {
    if (!cartId) {
      alert("❌ Cart ID is missing.");
      return;
    }

    if (!quantity || quantity <= 0) {
      alert("❌ Please enter a valid quantity.");
      return;
    }

    const itemToAdd = {
      itemId: id,
      name: dishName,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      imgUrl,
      ingredient,
      rating,
      vegNonveg,
    };

    try {
      const response = await CartService.addItem(cartId, itemToAdd);
      if (response) {
        alert("✅ Item added to cart!");
        navigate("/cart");
      } else {
        alert("❌ Failed to add item to cart.");
      }
    } catch (error) {
      console.error("❌ Error adding item to cart:", error);
      alert("❌ Failed to add item.");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <img 
          src={imgUrl} 
          alt={dishName} 
          className="w-full h-64 object-contain rounded-xl mb-6"
        />

        <h3 className="text-3xl font-extrabold text-[#e87c21] mb-4">{dishName}</h3>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Ingredients:</span> {ingredient}
        </p>

        <p className="flex items-center text-gray-700 mb-2">
          <FaStar className="mr-2 text-yellow-400" /> {rating} ⭐
        </p>

        <p className="flex items-center text-gray-700 mb-4">
          {vegNonveg === 1 ? (
            <>
              <FaLeaf className="mr-2 text-green-500" /> Vegetarian
            </>
          ) : (
            <>
              <FaHamburger className="mr-2 text-red-500" /> Non-Vegetarian
            </>
          )}
        </p>

        <p className="text-2xl font-bold text-gray-800 mb-6">Price: Rs. {price}</p>

        <div className="flex items-center mb-6">
          <label htmlFor="quantity" className="mr-4 text-lg font-semibold">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="p-2 border rounded w-20"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-bold py-3 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
