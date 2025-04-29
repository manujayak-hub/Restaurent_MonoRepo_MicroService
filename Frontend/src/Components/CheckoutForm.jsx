import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import OrderService from '../Services/OrderService';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            fontFamily: 'Arial, sans-serif',
            '::placeholder': {
                color: '#aab7c4',
            },
            iconColor: '#f97316',
        },
        invalid: {
            color: '#e11d48',
            iconColor: '#e11d48',
        },
    },
};

const CheckoutForm = ({ orderId, amount, orderDetails, onPaymentSuccess }) =>
{
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState('');
    const [paymentId, setPaymentId] = useState(null);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError('');

        try
        {
            const { data } = await axios.post("http://localhost:8083/api/payment/create-payment-intent", {
                amount: amount * 100,
                currency: "usd",
                paymentMethodType: "card",
            });

            console.log('Payment intent response:', data);

            const clientSecret = data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error)
            {
                setError(result.error.message);
            } else
            {
                if (result.paymentIntent.status === 'succeeded')
                {
                    setPaymentSuccess(true);
                    setPaymentId(data.paymentId);

                    try
                    {
                        await OrderService.updaterecord(orderId, 'Paid');
                        console.log('Order status updated to Paid.');

                        const paymentData = {
                            phoneNumber: "+94713259819",
                            amount: amount,
                        };

                        await axios.post("http://localhost:8083/api/sms/send-receipt", paymentData);
                        console.log('Receipt sent to mobile number.');
                    } catch (updateError)
                    {
                        console.error('Failed to update order status:', updateError);
                    }

                    onPaymentSuccess();

                    setTimeout(() =>
                    {
                        navigate('/resuserdash');
                    }, 3000);
                }
            }
        } catch (err)
        {
            console.error('Payment failed: ', err);
            setError('Payment failed. ' + (err.message || 'Please try again later.'));
        } finally
        {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment Details
                </h2>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                        <svg className="w-4 h-4 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Card Information
                    </label>
                    <div className="border border-gray-300 rounded-md p-4 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all duration-200 bg-white">
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">* For testing, use card number 4242 4242 4242 4242, any future date, any CVC, and any ZIP.</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded"
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {paymentSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6"
                    >
                        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-12 w-12 text-green-500 animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-green-700 font-bold text-lg">Payment Successful!</p>
                                    <p className="text-green-600">Your order has been processed and will be ready soon.</p>
                                    <p className="text-green-600 text-sm mt-2">Redirecting to your dashboard...</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md shadow transition-all duration-300 transform hover:-translate-y-1 
                        ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Complete Payment
                            </span>
                        )}
                    </button>
                )}

                <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Secure Payment
                    </div>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Encrypted
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default CheckoutForm;