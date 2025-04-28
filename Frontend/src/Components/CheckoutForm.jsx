import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

const CheckoutForm = ({ orderId, amount, orderDetails }) =>
{
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState('');
    const [paymentId, setPaymentId] = useState(null);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

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
                    // Removed confirm-payment API call here
                }
            }
        } catch (err)
        {
            console.error('Payment failed: ', err);
            setError('Payment failed. ' + err.message);
        } finally
        {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                    Card Information
                </label>
                <div className="border border-gray-300 rounded-md p-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded animate-pulse">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {paymentSuccess ? (
                <div className="mt-6 transition-all duration-500 transform translate-y-0 opacity-100">
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-green-700 font-medium">Payment Successful!</p>
                                <p className="text-green-600 text-sm">Your order has been processed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md shadow transition-all duration-200 transform hover:-translate-y-1 
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
                        'Pay Now'
                    )}
                </button>
            )}
        </form>
    );
};

export default CheckoutForm;
