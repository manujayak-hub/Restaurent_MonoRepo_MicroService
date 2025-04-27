import React, { useState } from 'react';
import CartService from "../../Services/CartService";  // Adjust the import path if needed

const TestCartForm = () => {
  const [userId, setUserId] = useState('');  // User ID input state for creating a cart
  const [cartId, setCartId] = useState(localStorage.getItem('cartId') || '');
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);  // Default quantity can be 1
  const [items, setItems] = useState([]);  // State to store cart items

  // Function to create a cart for a user
  const handleCreateCart = async () => {
    if (!userId) {
      alert('❌ Please enter a User ID.');
      return;
    }
  
    if (cartId) {
      alert('❌ Cart already exists.');
      return;
    }
  
    try {
      const response = await CartService.create({ userId });
      if (response && response.cart) {
        setCartId(response.cart.id); // Use the cart's ID from the response
        localStorage.setItem('cartId', response.cart.id); // Store cartId in localStorage
        alert('✅ Cart created successfully!');
      } else {
        alert('❌ Failed to create cart.');
      }
    } catch (error) {
      console.error('❌ Error creating cart:', error);
      alert('❌ Failed to create cart.');
    }
  }; 

  // Function to add item to cart
  const handleAddToCart = async () => {
    if (!cartId) {
      alert('❌ Cart ID is missing.');
      return;
    }
  
    if (!itemId || !name || !price || !quantity) {
      alert('❌ Please fill in all fields.');
      return;
    }
  
    const item = {
      itemId,
      name,
      price: parseFloat(price),  // Ensure price is a number
      quantity: parseInt(quantity, 10),  // Ensure quantity is an integer
    };
  
    try {
      const response = await CartService.addItem(cartId, item);
      if (response) {
        setItems((prevItems) => [...prevItems, item]);  // Add new item to the list of items
        console.log('✅ Item added:', response);
        alert('✅ Item added to cart!');
      } else {
        alert('❌ Failed to add item to cart.');
      }
    } catch (error) {
      console.error('❌ Error adding item to cart:', error);
      alert('❌ Failed to add item.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Create Cart and Add Items</h2>

      {/* Create Cart Section */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="userId">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <button
          onClick={handleCreateCart}
          className="w-full py-2 mt-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Create Cart
        </button>
      </div>

      {/* Add Item to Cart Section */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="itemId">
          Item ID
        </label>
        <input
          type="text"
          id="itemId"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          placeholder="Item ID"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
          Item Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="quantity">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>

      {/* Display Items in Cart */}
      <h3 className="text-lg font-semibold text-blue-600 mt-6">Items in Cart</h3>
      <ul className="mt-2">
        {items.map((item) => (
          <li key={item.itemId} className="flex justify-between p-2 border-b">
            <span>{item.name}</span>
            <span>{item.price} Rs</span>
            <span>Quantity: {item.quantity}</span>
          </li>
        ))}
      </ul>

      {/* Display Cart ID */}
      <h3 className="mt-4 text-sm text-gray-600">Cart ID: {cartId || 'Not created yet'}</h3>

    </div>
  );
};

export default TestCartForm;
