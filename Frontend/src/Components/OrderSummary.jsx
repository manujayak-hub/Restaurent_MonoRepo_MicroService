const OrderSummary = ({ orderId, amount, orderDetails }) =>
{
    return (
        <div className="bg-gray-50 rounded-lg shadow-md p-6 w-full max-w-md transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {orderDetails.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center mr-3">
                                <span className="text-gray-500 text-xs">{item.quantity}x</span>
                            </div>
                            <span className="text-gray-800">{item.name}</span>
                        </div>
                        <span className="text-gray-800">${item.price.toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${(amount - 4.99).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$4.99</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4">
                    <span>Total</span>
                    <span>${amount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;