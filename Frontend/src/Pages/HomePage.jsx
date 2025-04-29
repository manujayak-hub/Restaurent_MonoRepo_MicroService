import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaMotorcycle, FaLeaf, FaUtensils, FaStar, FaArrowRight } from "react-icons/fa";
import Header from "../Components/Header"; // Importing your existing Header component

const HomePage = () =>
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Featured restaurants data
    const featuredRestaurants = [
        {
            id: 1,
            name: "Burger Haven",
            image: "/api/placeholder/400/320",
            cuisine: "Fast Food",
            rating: 4.8,
            deliveryTime: "15-25 min",
            category: "burgers"
        },
        {
            id: 2,
            name: "Green Garden",
            image: "/api/placeholder/400/320",
            cuisine: "Vegetarian",
            rating: 4.5,
            deliveryTime: "20-30 min",
            category: "healthy"
        },
        {
            id: 3,
            name: "Pizza Palace",
            image: "/api/placeholder/400/320",
            cuisine: "Italian",
            rating: 4.7,
            deliveryTime: "20-35 min",
            category: "pizza"
        },
        {
            id: 4,
            name: "Sushi Express",
            image: "/api/placeholder/400/320",
            cuisine: "Japanese",
            rating: 4.9,
            deliveryTime: "25-40 min",
            category: "healthy"
        },
        {
            id: 5,
            name: "Taco Town",
            image: "/api/placeholder/400/320",
            cuisine: "Mexican",
            rating: 4.6,
            deliveryTime: "15-30 min",
            category: "tacos"
        },
        {
            id: 6,
            name: "Sweet Delights",
            image: "/api/placeholder/400/320",
            cuisine: "Desserts",
            rating: 4.7,
            deliveryTime: "15-25 min",
            category: "desserts"
        }
    ];

    // Popular food items
    const popularItems = [
        {
            id: 1,
            name: "Double Cheeseburger",
            image: "/api/placeholder/400/320",
            price: 12.99,
            restaurant: "Burger Haven"
        },
        {
            id: 2,
            name: "Avocado Salad",
            image: "/api/placeholder/400/320",
            price: 9.99,
            restaurant: "Green Garden"
        },
        {
            id: 3,
            name: "Supreme Pizza",
            image: "/api/placeholder/400/320",
            price: 15.99,
            restaurant: "Pizza Palace"
        },
        {
            id: 4,
            name: "Rainbow Roll",
            image: "/api/placeholder/400/320",
            price: 18.99,
            restaurant: "Sushi Express"
        }
    ];

    // Filter restaurants based on active category
    const filteredRestaurants = activeCategory === "all"
        ? featuredRestaurants
        : featuredRestaurants.filter(restaurant => restaurant.category === activeCategory);

    // Animation effect
    useEffect(() =>
    {
        setIsLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">


            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <Header />
                <div className="bg-gradient-to-r from-[#1f2e4a] to-[#1f2e4a]/90 text-white">
                    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center">
                        <div className={`md:w-1/2 space-y-6 transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Delicious Food <span className="text-[#e87c21]">Delivered</span> To Your Door
                            </h1>
                            <p className="text-lg text-gray-200">
                                The best restaurants in your city at your fingertips. Fast delivery, amazing taste.
                            </p>

                            <div className="relative mt-8">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for food or restaurants..."
                                    className="w-full pl-12 pr-4 py-4 rounded-full border-none focus:ring-2 focus:ring-[#e87c21] text-gray-800"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#e87c21] hover:bg-[#e87c21]/80 text-white px-6 py-2 rounded-full transition-all duration-300">
                                    Search
                                </button>
                            </div>

                            <div className="flex items-center space-x-4 pt-4">
                                <div className="flex items-center">
                                    <FaMotorcycle className="text-[#e87c21] mr-2" />
                                    <span>Fast Delivery</span>
                                </div>
                                <div className="flex items-center">
                                    <FaLeaf className="text-[#7fc7e0] mr-2" />
                                    <span>Fresh Food</span>
                                </div>
                                <div className="flex items-center">
                                    <FaUtensils className="text-[#e87c21] mr-2" />
                                    <span>Top Restaurants</span>
                                </div>
                            </div>
                        </div>

                        <div className={`md:w-1/2 mt-12 md:mt-0 transition-all duration-1000 delay-300 transform ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
                            <div className="relative">
                                <img
                                    src="/api/placeholder/600/400"
                                    alt="Delicious food"
                                    className="rounded-lg shadow-xl mx-auto transform rotate-2 hover:rotate-0 transition-all duration-500"
                                />
                                <img
                                    src="/api/placeholder/200/200"
                                    alt="Food delivery"
                                    className="absolute -bottom-10 -left-10 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg transform hover:scale-110 transition-all duration-500"
                                />
                                <div className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-500">
                                    <FaMotorcycle className="text-[#e87c21] text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-[#1f2e4a] mb-8">Categories</h2>

                    <div className="flex flex-wrap gap-4 mb-10">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === "all"
                                ? "bg-[#e87c21] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveCategory("burgers")}
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === "burgers"
                                ? "bg-[#e87c21] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Burgers
                        </button>
                        <button
                            onClick={() => setActiveCategory("pizza")}
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === "pizza"
                                ? "bg-[#e87c21] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Pizza
                        </button>
                        <button
                            onClick={() => setActiveCategory("healthy")}
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === "healthy"
                                ? "bg-[#e87c21] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Healthy
                        </button>
                        <button
                            onClick={() => setActiveCategory("tacos")}
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === "tacos"
                                ? "bg-[#e87c21] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Tacos
                        </button>
                        <button
                            onClick={() => setActiveCategory("desserts")}
                            className={`px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === "desserts"
                                ? "bg-[#e87c21] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Desserts
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Restaurants */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-[#1f2e4a]">Featured Restaurants</h2>
                        <Link to="/restaurants" className="text-[#e87c21] font-semibold flex items-center hover:underline">
                            View All <FaArrowRight className="ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredRestaurants.map((restaurant, index) => (
                            <div
                                key={restaurant.id}
                                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-sm font-semibold flex items-center">
                                        <FaStar className="text-yellow-400 mr-1" /> {restaurant.rating}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#1f2e4a] mb-2">{restaurant.name}</h3>
                                    <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{restaurant.deliveryTime}</span>
                                        <Link to={`/restaurant/${restaurant.id}`} className="bg-[#e87c21]/10 text-[#e87c21] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e87c21]/20 transition-all duration-300">
                                            View Menu
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Items */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-[#1f2e4a] mb-8">Popular Right Now</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                style={{ transitionDelay: `${index * 150 + 300}ms` }}
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-end">
                                        <div className="p-4 text-white">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm opacity-80">{item.restaurant}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-[#1f2e4a]">{item.name}</h3>
                                        <span className="font-bold text-[#e87c21]">${item.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{item.restaurant}</p>

                                    <button className="w-full mt-4 bg-[#7fc7e0] hover:bg-[#7fc7e0]/80 text-white py-2 rounded-lg font-medium transition-all duration-300">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gradient-to-r from-[#7fc7e0]/10 to-[#e87c21]/10">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-[#1f2e4a] mb-12">How It Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className={`text-center transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            <div className="w-20 h-20 mx-auto bg-[#e87c21] rounded-full flex items-center justify-center mb-6 shadow-lg">
                                <FaSearch className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1f2e4a] mb-3">Choose Your Food</h3>
                            <p className="text-gray-600">Browse our extensive selection of restaurants and dishes to find exactly what you're craving.</p>
                        </div>

                        {/* Step 2 */}
                        <div className={`text-center transition-all duration-700 delay-150 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            <div className="w-20 h-20 mx-auto bg-[#1f2e4a] rounded-full flex items-center justify-center mb-6 shadow-lg">
                                <FaUtensils className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1f2e4a] mb-3">Place Your Order</h3>
                            <p className="text-gray-600">Easily customize your order, add special instructions, and securely check out in just a few clicks.</p>
                        </div>

                        {/* Step 3 */}
                        <div className={`text-center transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            <div className="w-20 h-20 mx-auto bg-[#7fc7e0] rounded-full flex items-center justify-center mb-6 shadow-lg">
                                <FaMotorcycle className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1f2e4a] mb-3">Fast Delivery</h3>
                            <p className="text-gray-600">Track your order in real-time as our delivery partners bring your food straight to your door.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Download */}
            <section className="py-16 bg-[#1f2e4a]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className={`md:w-1/2 text-white mb-10 md:mb-0 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Download Our App</h2>
                            <p className="text-gray-300 mb-8">Get even faster ordering, exclusive app deals, and more features on our mobile app.</p>

                            <div className="flex flex-wrap gap-4">
                                <a href="#" className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center transition-all duration-300">
                                    <span className="mr-3">🍎</span>
                                    <div>
                                        <div className="text-xs">Download on the</div>
                                        <div className="font-semibold">App Store</div>
                                    </div>
                                </a>

                                <a href="#" className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center transition-all duration-300">
                                    <span className="mr-3">🤖</span>
                                    <div>
                                        <div className="text-xs">Get it on</div>
                                        <div className="font-semibold">Google Play</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className={`md:w-1/2 relative transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
                            <img
                                src="/api/placeholder/300/600"
                                alt="Mobile app screenshot"
                                className="mx-auto h-72 md:h-96 rounded-xl shadow-2xl border-4 border-white/10 transform -rotate-6 hover:rotate-0 transition-all duration-500"
                            />
                            <div className="absolute -top-4 -right-4 bg-[#e87c21] text-white rounded-full p-4 shadow-lg animate-bounce">
                                <FaStar className="text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-[#1f2e4a] mb-4">Get Exclusive Deals</h2>
                    <p className="text-gray-600 mb-8">Subscribe to our newsletter and get 10% off your first order!</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-grow px-4 py-3 rounded-lg border-gray-300 focus:ring-[#e87c21] focus:border-[#e87c21]"
                        />
                        <button className="bg-[#e87c21] hover:bg-[#e87c21]/80 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1f2e4a] text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                        <div>
                            <Link to="/" className="text-2xl font-bold text-[#e87c21] flex items-center mb-4">
                                🍴 Foodies
                            </Link>
                            <p className="text-gray-400 mb-6">Delivering happiness one meal at a time.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span>📱</span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span>📸</span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span>🐦</span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span>👍</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-gray-400 hover:text-[#e87c21] transition-colors">Home</Link></li>
                                <li><Link to="/about" className="text-gray-400 hover:text-[#e87c21] transition-colors">About Us</Link></li>
                                <li><Link to="/restaurants" className="text-gray-400 hover:text-[#e87c21] transition-colors">Restaurants</Link></li>
                                <li><Link to="/contact" className="text-gray-400 hover:text-[#e87c21] transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Get Help</h3>
                            <ul className="space-y-2">
                                <li><Link to="/faq" className="text-gray-400 hover:text-[#e87c21] transition-colors">FAQ</Link></li>
                                <li><Link to="/delivery" className="text-gray-400 hover:text-[#e87c21] transition-colors">Delivery Information</Link></li>
                                <li><Link to="/payment" className="text-gray-400 hover:text-[#e87c21] transition-colors">Payment Options</Link></li>
                                <li><Link to="/terms" className="text-gray-400 hover:text-[#e87c21] transition-colors">Terms & Conditions</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex items-start">
                                    <span className="mr-2">📍</span>
                                    <span>123 Foodie Street, Flavor Town, FT 12345</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">📞</span>
                                    <span>+1 (555) 123-4567</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">📧</span>
                                    <span>support@foodies.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} Foodies. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;