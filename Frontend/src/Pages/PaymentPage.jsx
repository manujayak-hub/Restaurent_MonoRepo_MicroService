import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../Components/CheckoutForm";
import OrderSummary from "../Components/OrderSummary";

// Stripe Publishable Key
const stripePromise = loadStripe("pk_test_51RI5VbRogb3j20qj9LWcqb4RnHTvi91WnJdMkAFzheXy9Xc5ulinFHLhKzhLs7mYBqlcbWDGPRvc8A8uG9Ajs1iv00W5tVn7iN");

const PaymentPage = () =>
{
  const orderId = "ORDER12345";
  const amount = 49.99; // Example amount in dollars
  const [isVisible, setIsVisible] = useState(false);

  // Example order details
  const orderDetails = [
    { name: "Premium Product", price: 39.99, quantity: 1 },
    { name: "Add-on Service", price: 5.01, quantity: 1 },
  ];

  useEffect(() =>
  {
    // Animation on page load
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-6xl mx-auto transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-12 pb-2 border-b border-gray-200">Complete Your Purchase</h1>

        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left side - Order details */}
          <div className={`w-full lg:w-1/2 transition-all duration-700 delay-100 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <OrderSummary orderId={orderId} amount={amount} orderDetails={orderDetails} />
          </div>

          {/* Right side - Payment gateway */}
          <div className={`w-full lg:w-1/2 transition-all duration-700 delay-200 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <Elements stripe={stripePromise}>
              <CheckoutForm orderId={orderId} amount={amount} orderDetails={orderDetails} />
            </Elements>
          </div>
        </div>

        <div className={`mt-12 text-center text-gray-500 text-sm transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p>Your payment information is processed securely. We do not store your credit card details.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
