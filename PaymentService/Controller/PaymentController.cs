using Microsoft.AspNetCore.Mvc;
using Stripe;
using PaymentService.Models;
using PaymentService.Services;
using System.Threading.Tasks;

namespace PaymentService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentServiceManager _paymentServiceManager;

        public PaymentController(PaymentServiceManager paymentServiceManager)
        {
            _paymentServiceManager = paymentServiceManager;
        }

        [HttpPost("create-payment-intent")]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] PaymentIntentRequest request)
        {
            // Create the payment intent via Stripe
            var options = new PaymentIntentCreateOptions
            {
                Amount = request.Amount,
                Currency = request.Currency,
                PaymentMethodTypes = new List<string> { request.PaymentMethodType }
            };

            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);

            // Save the payment to MongoDB
            var payment = await _paymentServiceManager.CreatePaymentAsync(
                orderId: Guid.NewGuid().ToString(), // You can generate order ID however you prefer
                amount: request.Amount / 100m // Stripe amount is in cents
            );

            return Ok(new
            {
                clientSecret = paymentIntent.ClientSecret,
                paymentId = payment.Id // return the payment ID from MongoDB
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _paymentServiceManager.GetAllPaymentsAsync();
            return Ok(payments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaymentById(string id)
        {
            var payment = await _paymentServiceManager.GetPaymentByIdAsync(id);
            if (payment == null)
            {
                return NotFound();
            }
            return Ok(payment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentById(string id)
        {
            var deleted = await _paymentServiceManager.DeletePaymentByIdAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
