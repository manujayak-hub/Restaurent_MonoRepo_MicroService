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


            var database = client.GetDatabase("PaymentDb");
            _payments = database.GetCollection<Payment>("Payments");
        }

        public async Task<Payment> CreatePaymentAsync(string orderId, decimal amount)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(amount * 100),
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

            await _payments.InsertOneAsync(payment);

            return payment;
        }
        public async Task<List<Payment>> GetAllPaymentsAsync()
        {
            return await _payments.Find(_ => true).ToListAsync();
        }

        public async Task<Payment?> GetPaymentByIdAsync(string id)
        {
            return await _payments.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<bool> DeletePaymentByIdAsync(string id)
        {
            var result = await _payments.DeleteOneAsync(p => p.Id == id);
            return result.DeletedCount > 0;
        }

    }

}
