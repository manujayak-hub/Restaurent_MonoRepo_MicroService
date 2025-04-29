import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CheckoutForm from "../Components/CheckoutForm";
import OrderSummary from "../Components/OrderSummary";
import Header from "../Components/Header"
import Footer from "../Components/Footer"



// Stripe Publishable Key
const stripePromise = loadStripe("pk_test_51RI5VbRogb3j20qj9LWcqb4RnHTvi91WnJdMkAFzheXy9Xc5ulinFHLhKzhLs7mYBqlcbWDGPRvc8A8uG9Ajs1iv00W5tVn7iN");

const PaymentPage = () =>
{

  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>
  {
    // Simulate loading time for smooth transitions
    const timer = setTimeout(() =>
    {
      const orderDetailsFromStorage = JSON.parse(localStorage.getItem("orderDetails"));

      if (orderDetailsFromStorage)
      {
        setOrderDetails(orderDetailsFromStorage);
      } else
      {
        console.error("Order details not found in localStorage.");
      }

      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const clearLocalStorage = () =>
  {
    localStorage.removeItem("orderDetails");
    console.log("Local storage cleared.");
  };

  // Loading state
  if (isLoading)
  {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-bounce mb-4">
            <svg className="w-16 h-16 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Preparing your order...</h2>
        </div>
      </div>
    );
  }

  // Error state - no order details
  if (!orderDetails)
  {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="inline-block mb-4 text-red-500">
              <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Information Missing</h2>
            <p className="text-gray-600 mb-6">We couldn't find your order details. Please return to the menu and try again.</p>
            <button
              onClick={() => window.location.href = '/menu'}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md shadow transition-all duration-300"
            >
              Return to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-white p-4 rounded-full shadow-md mb-6">
                <svg className="w-12 h-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </motion.div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Complete Your Order</h1>
            <p className="text-gray-600 max-w-xl mx-auto">Your delicious meal is just a few steps away!</p>
          </div>

          <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <OrderSummary
                orderId={orderDetails.orderId}
                amount={orderDetails.price * orderDetails.quantity}
                orderImage={orderDetails.imgUrl}
                orderDetails={[orderDetails]}
                userName={userName}
                userEmail={userEmail}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-1/2"
            >
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  orderId={orderDetails.orderId}
                  amount={orderDetails.price * orderDetails.quantity}
                  orderDetails={[orderDetails]}
                  onPaymentSuccess={clearLocalStorage}
                />
              </Elements>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-lg shadow-md p-6 inline-block">
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-gray-600">Your payment information is processed securely</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;