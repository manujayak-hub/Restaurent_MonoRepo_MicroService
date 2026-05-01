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
            var payment = await _paymentServiceManager.CreatePaymentAsync(
                orderId: Guid.NewGuid().ToString(),
                amount: request.Amount / 100m
            );

            return Ok(new
            {
                clientSecret = payment.StripePaymentIntentId,
                paymentId = payment.Id
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
