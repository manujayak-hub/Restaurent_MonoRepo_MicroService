using MongoDB.Driver;
using PaymentService.Models;
using Stripe;
using System.Threading.Tasks;

namespace PaymentService.Services
{
    public class PaymentServiceManager
    {
        private readonly IMongoCollection<Payment> _payments;

        public PaymentServiceManager(IConfiguration config)
        {
            var client = new MongoClient(config["MongoDB:ConnectionString"]);

            // Change the key to "MongoDB:ConnectionString"
            var database = client.GetDatabase("PaymentDb");
            _payments = database.GetCollection<Payment>("Payments");
        }

        public async Task<Payment> CreatePaymentAsync(string orderId, decimal amount)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(amount * 100), // amount in cents
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" }
            };

            var service = new PaymentIntentService();
            var paymentIntent = await service.CreateAsync(options);
            Console.WriteLine("Payment Intent Created: " + paymentIntent.ClientSecret);

            var payment = new Payment
            {
                OrderId = orderId,
                Amount = amount,
                Currency = "usd",
                Status = "Created",
                StripePaymentIntentId = paymentIntent.ClientSecret,
                CreatedAt = DateTime.UtcNow
            };

            await _payments.InsertOneAsync(payment); // Insert the payment into MongoDB

            return payment;
        }
    }
}
