import { motion } from "framer-motion";

const OrderSummary = ({ orderId, amount, orderDetails, orderDate, orderImage, userName, userEmail }) =>
{

    const items = Array.isArray(orderDetails) ? orderDetails : [];


    const formattedDate = orderDate ? new Date(orderDate).toLocaleDateString() : new Date().toLocaleDateString();

    const subtotal = amount - 4.99;

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.3
            }
        })
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
            </h2>


            <div className="mb-6 bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Customer Information
                </h3>
                <p className="text-gray-600 flex items-center mb-1">
                    <span className="font-medium w-16">Name:</span>
                    <span className="ml-2">{userName || "Guest"}</span>
                </p>
                <p className="text-gray-600 flex items-center">
                    <span className="font-medium w-16">Email:</span>
                    <span className="ml-2">{userEmail || "N/A"}</span>
                </p>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        Order ID:
                    </span>
                    <span className="font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date:
                    </span>
                    <span className="font-medium">{formattedDate}</span>
                </div>
            </div>


            {orderImage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="rounded-xl overflow-hidden shadow-md">
                        <img
                            src={orderImage}
                            alt="Order Image"
                            className="w-full h-auto transform transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </motion.div>
            )}

            <div className="space-y-3 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Order Items
                </h3>

                {items.map((item, index) => (
                    <motion.div
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        key={index}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                                <span className="text-orange-500 font-medium">{item.quantity}x</span>
                            </div>
                            <span className="text-gray-800 font-medium">{item.dishName}</span>
                        </div>
                        <span className="text-gray-800 font-semibold">${item.price ? parseFloat(item.price).toFixed(2) : "N/A"}</span>
                    </motion.div>
                ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$4.99</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4 bg-orange-50 p-3 rounded-lg">
                    <span>Total</span>
                    <span className="text-orange-600">${amount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;